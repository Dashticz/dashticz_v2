Clock and Station Clock
#######################

Station Clock
-------------

.. image :: Stationclock.jpg

This is an 'old fashioned' station clock. http://www.3quarks.com/en/StationClock

You can add the station clock to a column with::

    columns[1]['blocks'] = ['stationclock'];

Config Settings
^^^^^^^^^^^^^^^
.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
      
  * - Settings
    - Description
  * - boss_stationclock
    - | shows hands red axis cover
      | ``'RedBoss'`` ``'NoBoss'`` ``'BlackBoss'`` ``'RedBoss'`` ``'ViennaBoss'``
  * - hide_seconds_stationclock
    - | ``true`` Hides second hand
      | ``false`` Default. Show second hand.

      
Clock
-------------

.. image :: clock.jpg

This is the standard clock. You can add this clock to a column with::

    columns[1]['blocks'] = ['clock'];
