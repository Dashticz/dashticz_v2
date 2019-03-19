Release Notes
=============
A link to the release notes will be posted in the Dashticz support forum. The total overview can be found below.

2.5.6 and 2.5.7
---------------

Graph improvements
~~~~~~~~~~~~~~~~~~

The following parameters can be added to a graph block definition:

==========   ===============================
Parameter    Description 
==========   ===============================
width        The width of the graph block  
title        The title of the graph block
graphTypes   | Array of values you want to show in the graph
             | ``['te']``: Temperature
             | ``['hu']``: Humidity
             | ``['ba']``: Barometer
             | ``['uvi']``
             | ``['lux']``
             | ``['lux_avg']``
             | ``['gu', 'sp']``: wind guts and speed
             | ``['mm']``
             | ``['v_max']``
             | ``['v2']``
             | ``['mm']``
             | ``['eu']``
             | ``['u']``
             | ``['u_max']``
==========   ===============================

You can combine the values in one graph. Example::

   graphTypes: ['te', 'hu']

So now you can do::
   
   blocks['graph_idx'] = {
      title: 'Custom graph title',
      width: 6,
      graphTypes: ['te', 'hu']
   };

Additional mechanism to prevent caching of images in a button
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following parameter can be used in the definition of a button block

============   ===============================
Parameter      Description 
============   ===============================
forcerefresh   | Control the caching-prevention mechanism of the images for a button.
               | ``0`` : Normal caching behavior (=default)
               | ``1``, ``true`` : Prevent caching by adding t=<timestamp> parameter to the url. Not all webservers will handle this correctly
               | ``2`` : The image is loaded via php, preventing caching. (php must be enabled on your Dashticz server)
============   ===============================

.. csv-table:: 
   :header: Parameter, Description
   :widths: 5, 30
   :class: tight-table

   forcerefresh,"| Control the caching-prevention mechanism of the images for a button.
   | ``0`` : Normal caching behavior (=default)
   | ``1``,  ``true`` : Prevent caching by adding t=<timestamp> parameter to the url. Not all webservers will handle this correctly
   | ``2`` : The image is loaded via php, preventing caching. (php must be enabled on your Dashticz server)"


forcerefresh
   Control the caching-prevention mechanism of the images for a button.
   
   ``0`` : Normal caching behavior (=default)

   ``1`` (or ``true``) : Prevent caching by adding t=<timestamp> parameter to the url. Not all webservers will handle this correctly

   ``2`` :               The image is loaded via php, preventing caching. (php must be enabled on your Dashticz server)


Change background color for active 'slide' button
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you use a button to slide to specific screen (menu button), then the background of that button will change if that specific screen is active.
You can adapt the formatting of the selected button with the class ``.selectedbutton`` in your ``custom.css``. Example::

    .selectedbutton {
    	background-color: #cba !important;
    }

Flash on change
~~~~~~~~~~~~~~~
If you have defined the flash parameter for a device-block, then the block will flash on change.
The formatting of the flash can be modified via the class ``.blockchange`` in your ``custom.css``.

The parameter ``config['blink_color']`` is (temporarily?) not used anymore.
(reason: the apply background mechanism didn't work for non-touch devices)

Additional changes
~~~~~~~~~~~~~~~~~~
- Improved layout of blinds
- Update of Romanian language
- Update to FontAwesome 5.7.2
- Fix for some RFX meters (incl. water meter)
