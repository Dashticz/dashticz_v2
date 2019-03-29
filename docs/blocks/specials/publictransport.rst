.. _publictransport :

Public Transport 
################

Dashticz currently supports the following types of public transport info:

#. Public transport timetable, configurable via a public transport block:

   * The public transport company :ref:`VVSsection` (Germany)
   * :ref:`ns` (Netherlands).
   * Mobiliteit (Luxembourg).
   * irail (Belgium)
   * delijn (Belgium)

#. Predefined blocks, see :ref:`predefpubtrans`

   * ``'traffic'``. Traffic info from Rijkswaterstaat (Netherlands)
   * ``'train'``. Train status from `Rijden de Treinen <https://www.rijdendetreinen.nl/>`_ (Netherlands)

A public transport block can be configured as follows::

   //example station id: station-eindhoven
   var publictransport = {}
   publictransport.ovinfo= {
     station: 'station-eindhoven',
     title:'OV Info',
     show_lastupdate:true,
     provider: '9292',
     icon: 'train',
     results: 5
   };

.. image :: custom9292.png


Parameters
----------

.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
      
  * - Parameter
    - Description
  * - station
    - The station id, which can be obtained from `VVS <https://efa-api.asw.io/api/v1/station/>`_ (Germany) or `9292.nl <http://api.9292.nl/0.1/locations?lang=nl-NL&q=>`_ (Dutch, add your location to the url)
  * - title
    - Title of the block
  * - show_lastupdate
    - ``false`` , ``true``. To display the time of the last update.
  * - provider
    - | Public transport info provider to use. Choose from
      | ``'VVS'`` Germany
      | ``'9292'`` The Netherlands, all transport types
      | ``'9292-boat'`` The Netherlands, boat only
      | ``'9292-bus'`` The Netherlands, bus only
      | ``'9292-metro'`` The Netherlands, metro only
      | ``'9292-train'`` The Netherlands, train only
      | ``'9292-tram'`` The Netherlands, tram only      
      | ``'9292-tram-bus'`` The Netherlands, tram and bus      
      | ``'mobiliteit'`` Luxembourg
      | ``'irail'`` Belgium 
      | ``'delijn'`` Belgium
  * - icon
    - | The font-awesome icon (without ``fas fa-``)
      | ``'bus'``, ``'tram'``, ``'train'``, ``'ship'``, ``'subway'``, ...
  * - interval 
    - time in seconds for refreshing the data
  * - results 
    - Number of results to show 
  * - width
    - To customize the width. It's not recommended to change the default value (``12``) because of the size of the output.

Usage
-----

.. _VVSsection :

VVS
----

First find the correct station id from: https://efa-api.asw.io/api/v1/station/ 
So for Stuttgart Central Station the station id is 5006118.
Use this station id as value for the station parameter in the publictransport block. Example::

    var publictransport = {}
    publictransport.hbf= {
      station: '5006118',
      title:'Trains',
      show_lastupdate:true,
      provider: 'VVS',
      icon: 'train',
      interval: 15,
      results: 5
    };

.. _ns :

9292.nl
-------
First get the station id from http://api.9292.nl/0.1/locations?lang=nl-NL&q=eindhoven (Change eindhoven to your own search parameter). 
Then copy the id, and add to CONFIG.js as follows::

 
    //example station id: station-eindhoven
    var publictransport = {}
    publictransport.ovinfo= {
      station: 'station-eindhoven',
      title:'OV Info',
      show_lastupdate:true,
      provider: '9292',
      icon: 'train',
      results: 5
    };
    publictransport.ovinfotrain= {
      station: 'station-eindhoven',
      title:'Bus',
      show_lastupdate:true,
      provider: '9292-bus',
      icon: 'bus',
      results: 5
    };
    publictransport.ovinfobus= {
      station: 'station-eindhoven',
      title:'Trein',
      show_lastupdate:true,
      provider: '9292-train',
      icon: 'train',
      results: 5
    };

As you can see in the previous example specific transport types can be selected.

.. _predefpubtrans :

Predefined public transport blocks
----------------------------------

There are two predefined public transport blocks:

    * ``'traffic'``: Rijkswaterstaat Verkeersinfo (The Netherlands)
    * ``'train'``: Rijden de Treinen  (The Netherlands)

Example for your ''CONFIG.js''::

    columns[2] = {
      blocks: ['traffic', 'train'],
      width: 5
    }

.. image :: traffictrain.png

Styling
-------
Font size can be changed by adding this to your ``custom.css`` and change to your own preference::

    .publictransport div {
        font-size: 13px; 
    }
