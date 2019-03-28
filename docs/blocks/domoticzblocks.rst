Domoticz blocks
===============

Several types of Domoticz blocks can be defined:

* Devices
* Scenes
* Groups
* Variables

Devices
-------

Almost all Domoticz devices can be shown on the Dashticz dashboard.
Before you can use a device in a column you must make it known in your CONFIG.js as follows::

   blocks[123] = {
    title: 'My device',
    width: 12
   }
   
The number ``123`` is the Domoticz device id. The example above also shows the use of two parameters: ``title`` and ``width``.
For a full list of parameters see :ref:`dom_blockparameters`.

For most devices containing a value, like temperature, power, etc, it's possible to show the data as a graph. See :ref:`dom_graphs`.

Scenes and Groups
-----------------

Variables
---------

.. _dom_blockparameters:

Parameters
----------

.. list-table:: 
  :header-rows: 1
  :widths: 5 30
  :class: tight-table

  * - Parameter
    - Description
  * - width
    - ``1..12``: The width of the block relative to the column width
  * - title
    - ``'<string>'``: Custom title for the block
  * - flash
    - | Controls the flashing of the block when it's value changes.
      | ``0`` : No flashing (=default)
      | ``1..1000`` : Duration (in ms) of the flashing effect
  * - graphTypes
    - | Array of values you want to show in the graph
      | ``['te']``: Temperature
      | ``['hu']``: Humidity
      | ``['ba']``: Barometer
      | ``['gu', 'sp']``: wind guts and speed
      | ``['uvi']``, ``['lux']``, ``['lux_avg']``, ``['mm']``, ``['v_max']``
      | ``['v2']``, ``['mm']``, ``['eu']``, ``['u']``, ``['u_max']``
   
   
Usage
-----

.. _Flashonchange:

Flash on change
~~~~~~~~~~~~~~~~
To control the flashing of the block when it's value change you can set the ``flash`` parameter.
Via the style ``blockchange`` in ``custom.css`` you can set the class-style that needs to be applied.

Example ``CONFIG.js``::

  blocks[123] = {             //123 is the Domoticz device ID
    title: 'My new device',
    flash: 500                //flash effect of 500 ms
  }
  
Example ``custom.css`` (only needed in case you want to change the default flash effect)::

  .blockchange {
    background-color: #0f0 !important;	
  }
  
.. _dom_graphs:

Graphs
~~~~~~
If your Domoticz device contains a value (temperature, humidity, power, etc.)
then when you click on the block a popup window will appear showing a graph of the values of the device.

Besides popup graphs it's also possible to show the graph directly on the dashboard itself,
by adding the graph-id to a column definition as follows::

    //Adding a graph of device 691 to column 2
    columns[2]['blocks'] = [
      ...,
      'graph_691',      //691 is the device id for which you want to show the graph
      ...
    ]


In case of multi-value devices, like temp-hum-bar, you can select the data to show in the graph via the ``graphTypes`` parameter.

Examples::

    // To show the temperature values of device 658
    // in a popup graph
    blocks[658] = {
      graphTypes: ['te']
    }
    
    // To show the barometer values of device 659
    // on the dashboard directly
    blocks['graph_659'] = {
      graphTypes: ['ba']
    }

You can combine the values in one graph. Example::

   graphTypes: ['te', 'hu']

The title and width parameters are applicable to graph-blocks as well.

So now you can do::
   
   //To show a graph of device id 12
   //on the Dashboard
   //with a custom title and a 50% column width
   blocks['graph_12'] = {
      title: 'Custom graph title',
      width: 6,
      graphTypes: ['te', 'hu']
   };

.. note:: Using both a graph-block as well as a popup graph of the same device is not supported

  
  
  
