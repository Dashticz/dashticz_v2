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

.. csv-table:: 
   :header: Parameter, Description
   :widths: 5, 30
   :class: tight-table
   
   
   width, "``1..12``: The width of the button relative to the column width"
   title, "``'<string>'``: Custom title for the button"   
   slide, ``1..99``: Slide to specified screen on click.
   isimage, Set to ``true`` if the image should be shows in the full button width (default ``false``).
   image, ``'<url>'``: URL of the image to show in the button.
   url, ``'<url>'``: URL of the page to open in a popup window on click. 
   forcerefresh,"| Control the caching-prevention mechanism of the images for a button.
   | ``0`` : Normal caching behavior (=default)
   | ``1``,  ``true`` : Prevent caching by adding t=<timestamp> parameter to the url. Not all webservers will handle this correctly
   | ``2`` : The image is loaded via php, preventing caching. (php must be enabled on your Dashticz server)"

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




.. _forcerefresh:

forcerefresh
~~~~~~~~~~~~

   Control the caching-prevention mechanism of the images for a button.
   
   ``0`` : Normal caching behavior (=default)

   ``1`` (or ``true``) : Prevent caching by adding t=<timestamp> parameter to the url. Not all webservers will handle this correctly

   ``2`` :               The image is loaded via php, preventing caching. (php must be enabled on your Dashticz server)
