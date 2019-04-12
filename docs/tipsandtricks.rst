Tips and Tricks
===============

New button image on change of a device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Assume you want to change the image of a button when a Domoticz device changes.
In this example we use Domoticz device with IDX 120, and a button we call test.

::

    blocks[120] = {
      width: 6
    }

    buttons = {};   //only once
    buttons.test = {
      image: 'http://api.buienradar.nl/image/1.0/RadarMapNL',
      isimage: true,
      width: 4,
      refresh: 100000,
    }

To change the button image we add the function ``getChange_120`` to the file ``custom/custom.jss``. This function gets called everytime the device with idx=120 changes::

    function getChange_120(idx,value,device) {
    	buttons.test.image = 'img/moon/moon.02.png';
    	reloadImage(7, buttons.test);
    }

As soon as device 120 changes the image of the test button will change from a buienradar image to a moon image.

The only difficulty is to find the right value for the first parameter of the ``reloadImage`` function. (``7`` in the example)
To find the right value right-click on the button in Dashticz, select 'Inspect'.
A new window opens.

.. image :: tipsandtricks/buttonimage.jpg

Look for the text ``<img id="buttonimg_7"``. You have to use the number after ``buttonimg_`` as value.

This number may change when you add blocks to your Dashticz dashboard...
