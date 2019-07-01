Google Maps
###########

.. image :: googlemaps.png


First get a Google Maps API key: :ref:`gmapikey`
  
Adding the GM to the dashboard::

    config['gm_api'] = 'xxxxxxxxxxxxxx'; // The API key you received from Google

    var maps = {}
    maps.location = { height: 400, width:4, latitude: 40.4989948, longitude: -3.6610076, zoom:15 }

and used in::

    columns[3] = {}
    columns[3]['blocks'] = [maps.location]

Block parameters
----------------
The Google Maps module uses the following block parameters:

.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
      
  * - Parameter
    - Description
  * - width
    - Width of the Google Maps block compared to the full screen, not the column. Full screen width is 12. Meaning width of 6 will give a width of 50% of the screen size.
  * - height
    - The height of the block in pixels
  * - latitude
    - Latitude
  * - longitude
    - Longitude
  * - zoom
    - Zoom level

Config settings
---------------
The Google Maps module uses the following config settings:

.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
      
  * - Setting
    - Description
  * - gm_api
    - The API key you received from Google

Usage
-----

.. _gmapikey :

Getting a Google Maps API key
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Obtain your Google Maps API key from:

  https://developers.google.com/maps/documentation/javascript/get-api-key

  * Press Get Started
  
    .. image :: gmChooseMaps.png
    
  * Choose Maps, and press Continue
  * Follow the instructions
