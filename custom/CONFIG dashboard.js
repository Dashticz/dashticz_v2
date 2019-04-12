var config = {}
config['language'] = 'nl_NL'; //or: en_US, de_DE, fr_FR, hu_HU, it_IT, pt_PT, sv_SV
config['domoticz_ip'] = 'http://192.168.178.18:8080';
config['domoticz_refresh'] = '5';
config['dashticz_refresh'] = '60';

config['auto_swipe_back_after'] = '0';

//Definition of blocks
blocks = {}

//button configuration
buttons = {}
buttons.floorplan = {
  width:12,
  title:'Floor plan',
  url: 'http://192.168.178.18:8080/#Floorplans'
}

buttons.slidefloorplan = {
  width: 12,
  title:"slide to floorplan",
  slide:2
}
////////////////////// FRAMES ///////////////////////////
var frames = {}
frames.floorplan = {
  frameurl:"http://192.168.178.18:8080/#/Floorplans",
  height: '600',
  width:12
}

frames.weather = {
  frameurl:"//forecast.io/embed/#lat=49.2624&lon=-123.1155&name=Vancouver&color=#00aaff&font=Helvetica&fontColor=#ffffff&units=si&text-color=#fff&",
  refreshiframe: 600000,
  height: 250
}

//Definition of columns
columns = {}

columns[1] = { 
    blocks: [buttons.floorplan, buttons.slidefloorplan, frames.weather],
    width: 6
}

columns[2] = { 
    blocks: [frames.floorplan],
    width: 12
}


//Definition of screens
screens = {}
screens[1] = {
  columns: [1]
}
screens[2] = {
  columns: [2]
}
