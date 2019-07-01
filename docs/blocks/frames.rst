Frames
======

With a frame it's possible to show (internet) content directly on the Dashticz dashboard.

A frame is defined as follows::

    ////////////////////// FRAMES ///////////////////////////
    var frames = {}
    frames.weather = {
      frameurl:"//forecast.io/embed/#lat=49.2624&lon=-123.1155&name=Vancouver&color=#00aaff&font=Helvetica&fontColor=#ffffff&units=si&text-color=#fff&",
      height: 250     //height of the block in pixels
    }

In the previous example the weather forecast for Vancouver from forecast.io is downloaded.

You can add a frame to a column in the usual way::

    //Definition of columns
    columns = {}

    columns[1] = { 
        blocks: [frames.weather],
        width: 6
    }

Frame parameters
----------------

  .. list-table:: 
    :header-rows: 1
    :widths: 5, 30
    :class: tight-table
        
    * - Parameter
      - Description
    * - frameurl
      - The URL to load in the frame
    * - width
      - ``1..12`` The width of the frame relative to the column width. 12=100%, 3=25%
    * - heigth
      - Height of the frame in pixels
    * - refreshiframe
      - Refresh interval (in msec)
    * - forcerefresh
      - | Control the caching-prevention mechanism of the frame content.
        | ``0`` : Normal caching behavior (=default)
        | ``1``,  ``true`` : Prevent caching by adding t=<timestamp> parameter to the url. Not all websites will handle this correctly
        | ``2`` : The frame content is loaded via php, preventing caching. (php must be enabled on your Dashticz server)

Example
-------

::

    var config = {}
    config['language'] = 'nl_NL'; //or: en_US, de_DE, fr_FR, hu_HU, it_IT, pt_PT, sv_SV
    config['domoticz_ip'] = 'http://192.168.178.18:8080';   //Replace with your Domoticz IP:Portnumber
    config['domoticz_refresh'] = '5';
    config['dashticz_refresh'] = '60';

    config['auto_swipe_back_after'] = '0';

    //Definition of blocks
    blocks = {}

    ////////////////////// FRAMES ///////////////////////////
    var frames = {}
    frames.weather = {
      frameurl:"//forecast.io/embed/#lat=49.2624&lon=-123.1155&name=Vancouver&color=#00aaff&font=Helvetica&fontColor=#ffffff&units=si&text-color=#fff&",
      height: 250
    }

    //Definition of columns
    columns = {}

    columns[1] = { 
        blocks: [frames.weather],
        width: 6
    }

    //Definition of screens
    screens = {}
    screens[1] = {
      columns: [1]
    }

This will give the following result:

.. image :: framesexample.jpg
