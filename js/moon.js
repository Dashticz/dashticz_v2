// MIT License

// Copyright (c) 2018 Ivan

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var synmonth = 29.53058868  // Synodic month (new Moon to new Moon)

// Astronomical constants
var epoch = 2444238.5       // 1989 January 0.0

//Constants defining the Sun's apparent orbit
var elonge = 278.833540     // Ecliptic longitude of the Sun at epoch 1980.0
var elongp = 282.596403     // Ecliptic longitude of the Sun at perigee
var eccent = 0.016718       // Eccentricity of Earth's orbit
var sunsmax = 1.495985e8    // Sun's angular size, degrees, at semi-major axis distance
var sunangsiz = 0.533128

// Elements of the Moon's orbit, epoch 1980.0
var mmlong = 64.975464      // Moon's mean longitude at the epoch
var mmlongp = 349.383063    // Mean longitude of the perigee at the epoch
var mecc = 0.054900         // Eccentricity of the Moon's orbit
var mangsiz = 0.5181        // Moon's angular size at distance a from Earth
var msmax = 384401          // Semi-major axis of Moon's orbit in km

function MoonPhase(dateparam) {

  this._timespace = dateparam.getTime() / 1000
  this._pdata = utcToJulian(this._timespace)

    // Calculation of the Sun's position
    var day = this._pdata - epoch // Date within epoch
    var n = fixangle((360 / 365.2422) * day)    // Mean anomaly of the Sun
    var m = fixangle(n + elonge - elongp)       // Convert from perigee co-ordinates to epoch 1980.0
    var ec = kepler(m, eccent)                          // Solve equation of Kepler
    ec = Math.sqrt((1 + eccent) / (1 - eccent)) * Math.tan(ec / 2)
    ec = 2 * rad2deg(Math.atan(ec))                     // True anomaly
    var lambdasun = fixangle(ec + elongp) // Sun's geocentric ecliptic longitude

    var f = ((1 + eccent * Math.cos(deg2rad(ec))) / (1 - eccent * eccent)) // Orbital distance factor
    var sunDist = sunsmax / f       // Distance to Sun in km
    var sunAng = f * sunangsiz // Sun's angular size in degrees

    // Calculation of the Moon's position
    var ml = fixangle(13.1763966 * day + mmlong)                     // Moon's mean longitude
    var mm = fixangle(ml - 0.1114041 * day - mmlongp)                // Moon's mean anomaly
    var ev = 1.2739 * Math.sin(deg2rad(2 * (ml - lambdasun) - mm))       // Evection
    var ae = 0.1858 * Math.sin(deg2rad(m))                               // Annual equation
    var a3 = 0.37 * Math.sin(deg2rad(m))                                 // Correction term
    var mmP = mm + ev - ae - a3                                     // Corrected anomaly
    var mec = 6.2886 * Math.sin(deg2rad(mmP))                            // Correction for the equation of the centre
    var a4 = 0.214 * Math.sin(deg2rad(2 * mmP))                          // Another correction term
    var lP = ml + ev + mec - ae + a4                                // Corrected longitude
    var v = 0.6583 * Math.sin(deg2rad(2 * (lP - lambdasun)))             // constiation
    var lPP = lP + v // True longitude

    // Calculation of the phase of the Moon
    var moonAge = lPP - lambdasun                                   // Age of the Moon in degrees
    var moonPhase = (1 - Math.cos(deg2rad(moonAge))) / 2                 // Phase of the Moon

    // Distance of moon from the centre of the Earth
    var moonDist = (msmax * (1 - mecc * mecc)) / (1 + mecc * Math.cos(deg2rad(mmP + mec)))

    var moonDFrac = moonDist / msmax
    var moonAng = mangsiz / moonDFrac // Moon's angular diameter

    // store result
    this._phase = fixangle(moonAge) / 360                   // Phase (0 to 1)
    this._illum = moonPhase                                 // Illuminated fraction (0 to 1)
    this._age = synmonth * this.phase                      // Age of moon (days)
    this._dist = moonDist                                   // Distance (kilometres)
    this._angdia = moonAng                                  // Angular diameter (degrees)
    this._sundist = sunDist                                 // Distance to Sun (kilometres)
    this._sunangdia = sunAng                                // Sun's angular diameter (degrees)
    //phaseHunt()
    this._date = dateparam;
  

  function phaseHunt() {
    var sdate = utcToJulian(this._timespace)
    var adate = sdate - 45
    var ats = this._timespace - 86400 * 45
    var t = new Date(ats * 1000)
    // const t = time.Unix(int64(ats), 0)
    var yy = t.getFullYear()
    var mm = t.getMonth()

    var k1 = Math.floor((yy + ((mm - 1) * (1 / 12)) - 1900) * 12.3685)
    var nt1 = meanPhase(adate, k1)
    adate = nt1
    var nt2, k2

    while (true) {
      adate += synmonth
      k2 = k1 + 1
      nt2 = meanPhase(adate, k2)
      console.log(nt2)
      if (Math.abs(nt2 - sdate) < 0.75) {
        nt2 = truePhase(k2, 0.0)
      }
      if (nt1 <= sdate && nt2 > sdate) {
        break
      }
      nt1 = nt2
      k1 = k2
    }

    // const data [8]
    var data = []

    data[0] = truePhase(k1, 0.0)
    data[1] = truePhase(k1, 0.25)
    data[2] = truePhase(k1, 0.5)
    data[3] = truePhase(k1, 0.75)
    data[4] = truePhase(k2, 0.0)
    data[5] = truePhase(k2, 0.25)
    data[6] = truePhase(k2, 0.5)
    data[7] = truePhase(k2, 0.75)
    this._quarters = []
    for (var i = 0; i < 8; i++) {
      this._quarters[i] = (data[i] - 2440587.5) * 86400 // convert to UNIX time
    }
  }

  /**
   Calculates time of the mean new Moon for a given
   base date. This argument K to this function is the
   precomputed synodic month index, given by:
   K = (year - 1900) * 12.3685
   where year is expressed as a year aand fractional year
   */
  function meanPhase(sdate, k) {
    // Time in Julian centuries from 1900 January 0.5
    var t = (sdate - 2415020.0) / 36525
    var t2 = t * t
    var t3 = t2 * t

    return 2415020.75933 + synmonth * k +
      0.0001178 * t2 -
      0.000000155 * t3 +
      0.00033 * Math.sin(deg2rad(166.56 + 132.87 * t - 0.009173 * t2))
  }

  function truePhase(k, phase) {
    k += phase                      // Add phase to new moon time
    var t = k / 1236.85     // Time in Julian centures from 1900 January 0.5
    var t2 = t * t
    var t3 = t2 * t
    var pt = 2415020.75933 + synmonth * k +
      0.0001178 * t2 -
      0.000000155 * t3 +
      0.00033 * Math.sin(deg2rad(166.56 + 132.87 * t - 0.009173 * t2))

    var m = 359.2242 + 29.10535608 * k - 0.0000333 * t2 - 0.00000347 * t3           // Sun's mean anomaly
    var mprime = 306.0253 + 385.81691806 * k + 0.0107306 * t2 + 0.00001236 * t3     // Moon's mean anomaly
    var f = 21.2964 + 390.67050646 * k - 0.0016528 * t2 - 0.00000239 * t3           // Moon's argument of latitude

    if (phase < 0.01 || Math.abs(phase - 0.5) < 0.01) {
      // Corrections for New and Full Moon
      pt += (0.1734 - 0.000393 * t) * Math.sin(deg2rad(m)) +
        0.0021 * Math.sin(deg2rad(2 * m)) -
        0.4068 * Math.sin(deg2rad(mprime)) +
        0.0161 * Math.sin(deg2rad(2 * mprime)) -
        0.0004 * Math.sin(deg2rad(3 * mprime)) +
        0.0104 * Math.sin(deg2rad(2 * f)) -
        0.0051 * Math.sin(deg2rad(m + mprime)) -
        0.0074 * Math.sin(deg2rad(m - mprime)) +
        0.0004 * Math.sin(deg2rad(2 * f + m)) -
        0.0004 * Math.sin(deg2rad(2 * f - m)) -
        0.0006 * Math.sin(deg2rad(2 * f + mprime)) +
        0.0010 * Math.sin(deg2rad(2 * f - mprime)) +
        0.0005 * Math.sin(deg2rad(m + 2 * mprime));
    } else if (Math.abs(phase - 0.25) < 0.01 || Math.abs(phase - 0.75) < 0.01) {
      pt += (0.1721 - 0.0004 * t) * Math.sin(deg2rad(m)) +
        0.0021 * Math.sin(deg2rad(2 * m)) -
        0.6280 * Math.sin(deg2rad(mprime)) +
        0.0089 * Math.sin(deg2rad(2 * mprime)) -
        0.0004 * Math.sin(deg2rad(3 * mprime)) +
        0.0079 * Math.sin(deg2rad(2 * f)) -
        0.0119 * Math.sin(deg2rad(m + mprime)) -
        0.0047 * Math.sin(deg2rad(m - mprime)) +
        0.0003 * Math.sin(deg2rad(2 * f + m)) -
        0.0004 * Math.sin(deg2rad(2 * f - m)) -
        0.0006 * Math.sin(deg2rad(2 * f + mprime)) +
        0.0021 * Math.sin(deg2rad(2 * f - mprime)) +
        0.0003 * Math.sin(deg2rad(m + 2 * mprime)) +
        0.0004 * Math.sin(deg2rad(m - 2 * mprime)) -
        0.0003 * Math.sin(deg2rad(2 * m + mprime));
      if (phase < 0.5) { // First quarter correction
        pt += 0.0028 - 0.0004 * Math.cos(deg2rad(m)) + 0.0003 * Math.cos(deg2rad(mprime))
      } else {        // Last quarter correction
        pt += -0.0028 + 0.0004 * Math.cos(deg2rad(m)) - 0.0003 * Math.cos(deg2rad(mprime))
      }
    }

    return pt
  }

  function kepler(m, ecc) {
    var epsilon = 0.000001
    m = deg2rad(m)
    var e = m
    var delta = e - ecc * Math.sin(e) - m
    e -= delta / (1 - ecc * Math.cos(e))
    while (Math.abs(delta) > epsilon) {
      delta = e - ecc * Math.sin(e) - m
      e -= delta / (1 - ecc * Math.cos(e))
    }
    return e
  }


  function utcToJulian(time) {
    return time / 86400 + 2440587.5
  }


  function fixangle(a) {
    return (a - 360 * Math.floor(a / 360))
  }


  function rad2deg(r) {
    return (r * 180) / Math.PI
  }

  function deg2rad(d) {
    return (d * Math.PI) / 180
  }

  this.date = function () {
    return this._date;
  }

  this.pdata = function() {
    return this._pdata;
  }

  this.phase = function() {
    return this._phase;
  }

  this.illum = function() {
    return this._illum;
  }

  this.age = function () {
    return this._age;
  }

  this.dist = function () {
    return this._dist;
  }

  this.angdia = function () {
    return this._angdia;
  }

  this.sundist = function () {
    return this._sundist;
  }

  this.sunangdia = function () {
    return this._sunangdia;
  }

  this.newMoon = function () {
    return this._quarters[0]
  }

  this.firstQuarter = function () {
    return this._quarters[1]
  }

  this.fullMoon = function () {
    return this._quarters[2]
  }

  this.lastQuarter = function () {
    return this._quarters[3]
  }

  this.nextNewMoon = function () {
    return this._quarters[4]
  }

  this.nextFirstQuarter = function () {
    return this._quarters[1]
  }

  this.nextFullMoon = function () {
    return this._quarters[6]
  }

  this.nextLastQuarter = function () {
    return this._quarters[7]
  }

  this.phaseName = function () {
    var names = {
      0: "New Moon",
      1: "Waxing Crescent",
      2: "First Quarter",
      3: "Waxing Gibbous",
      4: "Full Moon",
      5: "Waning Gibbous",
      6: "Third Quarter",
      7: "Waning Crescent",
      8: "New Moon",
    }

    var i = Math.floor((this._phase + 0.0625) * 8)
    return names[i]
  }
}
