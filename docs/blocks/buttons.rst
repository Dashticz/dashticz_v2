Buttons
=======

Buttons are clickable elements that may show an image. First you have to define the button in ``CONFIG.js``::

    buttons = {}            //only once!!
    buttons.yr = {
    	width: 12,
      isimage: true,
      refreshimage: 60000,
    	image: 'https://www.yr.no/sted/Norge/Oppland/%C3%98ystre_Slidre/Beito/advanced_meteogram.png',
    	url: 'https://www.yr.no/sted/Norge/Oppland/%C3%98ystre_Slidre/Beito/langtidsvarsel.html'
    };

    // Then add the button to a specific column:
    var columns = {}          //This line only once!!
    columns['3'] = {
      blocks:  [
          ...,
          buttons.yr,
          ...
      ], 
      width: 1
    }


Parameters
----------

.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
      
  * - Parameter
    - Description
  * - width
    - ``1..12``: The width of the block relative to the column width
  * - title
    - ``'<string>'``: Custom title for the block
  * - slide
    - ``1..99``: Slide to specified screen on click.
  * - isimage
    - Set to ``true`` if the image should be shown in the full button width (default ``false``).
  * - image
    - ``'<url>'``: URL of the image to show in the button.
  * - url
    - ``'<url>'``: URL of the page to open in a popup window on click. 
  * - forcerefresh
    - | Control the caching-prevention mechanism of the images for a button.
      | ``0`` : Normal caching behavior (=default)
      | ``1``,  ``true`` : Prevent caching by adding t=<timestamp> parameter to the url. Not all webservers will handle this correctly
      | ``2`` : The image is loaded via php, preventing caching. (php must be enabled on your Dashticz server)
  * - log
    - | ``true`` Button will show the Domoticz log info
      | ``false`` Default
  * - level
    - Domoticz log level used by the log-button.
    
     

Usage
-----

.. _slidebutton:

Slide button
~~~~~~~~~~~~
If you have added the ``slide`` parameter to a button, then Dashtics will slide to the specific screen if the button is pressed.

If you use a button to slide to specific screen (menu button), then the background color of that button will change if that specific screen is active.

Example: If screen number 2 is the active screen, then a button with parameter ``slide:2`` will be shown as active.

You can adapt the formatting of the selected button with the class ``.selectedbutton`` in your ``custom.css``. Example::

    .selectedbutton {
      background-color: #cba !important;
    }

Example on how to use menu buttons::

    //three buttons are defined
    buttons.page1 = { width:12, title:'page 1', slide:1};
    buttons.page2 = { width:12, title:'page 2', slide:2};
    buttons.page3 = { width:12, title:'page 3', slide:3};
    
    //definition of a menu column
    var columns = {}          //This line only once!!
    columns['menu'] = {
      blocks:  [ buttons.page1, buttons.page2, buttons.page3],
      width: 1
    }

    //Define columns 1 to 6 as well
    // ...

    //Add the menu column to your screens
    var screens = {}        //This line only once!
    screens[1] = {
      columns: ['menu', 1,2]  
    }
    screens[2] = {
      columns: ['menu', 3,4]  
    }
    screens[3] = {
      columns: ['menu', 5,6]  
    }


.. _logbutton :

Domoticz log button
~~~~~~~~~~~~~~~~~~~

With a log-button you can show the Domoticz log in a popup window::

    var buttons = {}
    buttons.log = {
      key:'log',
      width:12,
      icon:'fas fa-microchip',
      title: 'Domoticz Log',
      log:true,
      level: 2
    }

It's also possible to show the Domoticz log directly in the Dashticz dashboard. See :ref:`customlog`

.. _forcerefresh:

forcerefresh
~~~~~~~~~~~~

   Control the caching-prevention mechanism of the images for a button.
   
   ``0`` : Normal caching behavior (=default)

   ``1`` (or ``true``) : Prevent caching by adding t=<timestamp> parameter to the url. Not all webservers will handle this correctly

   ``2`` :               The image is loaded via php, preventing caching. (php must be enabled on your Dashticz server)

Examples
--------

Additional examples of button definitions::

    var buttons = {}
    buttons.buienradar = {width:12, isimage:true, refreshimage:60000, image: 'http://api.buienradar.nl/image/1.0/RadarMapNL?w=285&h=256', url: 'http://www.weer.nl/verwachting/nederland/son/189656/'}
    buttons.radio = {width:12, image: 'img/radio_on.png', title: 'Radio', url: 'http://nederland.fm'}
    buttons.nunl = {width:12, icon: 'far fa-newspaper', title: 'Nu.nl', url: 'http://www.nu.nl'}
    buttons.webcam = {width:12, isimage:true, refresh:2000, image: 'http://ip_url_to_webcam', url: 'http://ip_url_to_webcam'}
