Styling via custom.css
######################

.. contents::
   
Almost all visual elements on the Dashticz dashboard are styled via so called style sheets. Normally the abbreviation CSS (Cascading Style Sheets) is used for this.
The source files that define the style information also have the ``.css`` extension.

There are a lot of creative users on the Domoticz Forum, that modify the CSS. A lot of examples can be found on the forum. Some examples will be summarized here, which you can use as a starting point to customize your own dashboard.

The default styling is defined in the file ``<dashticz_v2>/css/creative.css``. While you can use this file for inspiration, you should not modify it,
since the default styling can be modified in the file ``custom.css``, located in the folder ``<dashticz v2>/custom``

This sections has some examples of CSS that can be placed in ``custom.css``, so you can create your own look and feel.

Introduction into CSS
---------------------
A lot of CSS tutorials are available online. The first google result: https://www.w3schools.com/css/

A CSS style definition consists of two parts.

#. Selector
#. Style modifier

With the selector part you select certain elements on the Dashboard. With the style modifier part the visual appearance can be defined.

Almost all Dashticz elements on the dashboard have one or more class definitions associated with it.
For instance most blocks have the class ``transbg`` associated with it. As an example, You can use this class name to change the background colors for all blocks at once.
Add the following to ``custom.css``::

    .transbg {
     background-color: red !important;
    }

In this example the selector element is ``.transbg``. With this selector all elements with the class ``transbg`` are selected.
On the selection we apply a new background-color style.

In some cases, also in the example above, the statement ``!important`` needs to be added, to enforce that this style setting will overrule other style settings that have been defined by other style modifiers.

If you want to change only the background of one specific block you have to narrow the selector. For this you can use the data-id parameter.
All blocks that you have defined with ``blocks[idx]`` will have the data-id parameter with value ``'idx'`` attached to it::

    [data-id='120']  {
     background-color: red !important;
    }

    [data-id='120']  {
     background-color: red !important;
    }


All blocks on the dashboard have a unique id, which are sequentially numbered. How to find the block id will be explained later. Assuming the block you want to change has block id 3 then add the following to custom.css::

    #block_3 .transbg {
     background-color: red !important;
    }

This means: Change the background color to red for the elements with the class ``transbg`` associated with it within the block with the id ``block_3``.

So remember, blocks can have classes, parameters and id's associated with them. Blocks are selected by choosing the right class, parameter, and/or id.


Domoticz blocks
---------------

Used classes for Domoticz blocks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Example block definition::

    blocks[120] = {
      width: 6
    }

Placed in a column it can give the following result:

.. image :: block_120_css.jpg

The whole block has class ``block_120``
First line: ``title``
Second line: ``state``
Third line: ``lastupdate``

Background color
~~~~~~~~~~~~~~~~

To change the background color of all Domoticz blocks::

    div[class*='block_'] {
      background-color: red !important;
    }

To change the height of only this block::

    .block_120 {
      height: 150px !important;
    }


Styling of lastupdate text
~~~~~~~~~~~~~~~~~~~~~~~~~~

To change the font-size and color of the lastupdate text of this block::

  .block_120 .lastupdate {
    font-size: 20px;
    color: blue;
  }

Icon colors of a Domoticz switch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To change the icon colors for only this block::

    .block_120 .on {
      color:#F1C300;
    }

    .block_120 .off {
      color:#fff;
    }

In the previous example you can see the ``on`` class or ``off`` class can be used to select a block depending on the state of the Domoticz device.
      
Block titles
------------


Example block definition::

    blocks['myblocktitle'] = {
      type: 'blocktitle',
      title: 'My Devices Block'
    }

To select all the blocktitles and change the background color::

    .titlegroups {background-color: gray !important;}

In the previous example the class ``titlegroups`` is used to select the block.

To change the background color for only this block title::

    .titlegroups[data-id='myblocktitle'] {background-color: gray !important;}

As you can see in the previous example we select blocks from the class ``titlegroups``
that has the value ``myblocktitle`` for the parameter ``data-id``. This is the generic way to select a specific title block.

Font Size
~~~~~~~~~~
To change the font size of this block title::

    .titlegroups[data-id='myblocktitle'] h3 {
      font-size: 30px;
    }

Smaller Title blocks (Height)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    div.mh.titlegroups {
        height: 60px !important;		/* default height=75px */
        padding-top: 3px;			/* center text for new height */
    }


Generic block related
---------------------

Hover background color
~~~~~~~~~~~~~~~~~~~~~~~~

::

    .transbg.hover.mh:hover { background-color: red;}


Reduced space around blocks
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To make the space between all blocks smaller::

    .transbg[class*="col-xs"] {
      border: 3px solid rgba(255,255,255,0);		/* border: 7px -> 3px - Smaller space between blocks */
    }

Rounded corners
~~~~~~~~~~~~~~~~

Rounded corners for all blocks::

    .transbg[class*="col-xs"] {
      border-radius: 20px;                            /* Rounded corners */
    }

Icons
-----

Larger (Bulb) icons
~~~~~~~~~~~~~~~~~~~

::

    .far.fa-lightbulb:before{
        font-size: 24px;
    }

    .fas.fa-lightbulb:before{
        font-size: 24px;
    }


All Icons on the Dashboard Larger
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To make ALL ICONS on the Dashboard larger in one move, just simple add (choose font-size wisely!!)::

    .far,.fas,.wi {
       font-size:24px !important;
    }

Larger Logitech Media Server buttons
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    .fas.fa-arrow-circle-left {
        font-size: 50px !important;
        }
    .fas.fa-stop-circle {
       font-size: 50px !important;
    }
    .fas.fa-play-circle {
       font-size: 50px !important;
    }
    .fas.fa-arrow-circle-right {
       font-size: 50px !important;
    }
    .fas.fa-pause-circle {
       font-size: 50px !important;
    }
    

Fonts & Text Size
-----------------

Change font size of 1 specific (text) device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Every block has an unique identifier-classname, which look something like '''.block_xxx''' (where xxx is the idx of your choice) that can be used in css. Example::

    .block_233 {
       font-size:120px !important;
       color:red !important;
    }

    Of course, change 233 to the idx of your choice ;)

Change font size of public transport module
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    .publictransport div {
        font-size: 13px; 
    }


Text Mediaplayer smaller
~~~~~~~~~~~~~~~~~~~~~~~~

::

    .h4.h4 {
       font-size:12px;
    }


Fontsize Trashcan Module
~~~~~~~~~~~~~~~~~~~~~~~~

::

    .trash .state div.trashrow {
        font-size: 12px;
    }

    .trash .state div.trashtoday {
        font-size: 16px;
    }

    .trash .state div.trashtomorrow {
        font-size: 14px;
    }


Color & Transparancy
--------------------

Transparent Buttons Thermostat
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    .input-groupBtn .btn-number {
        opacity: 0.5;
        color: white;
        background-color: rgb(34, 34, 34);
        border-radius: 0px;
        padding: 6px 10px 6px 10px;
        line-height: 20px;
        background-color: transparent;
    }

Colored Lightbulbs
~~~~~~~~~~~~~~~~~~

It is possible to use colors for the bulb-icons.
In ``custom.css`` add something like::

    .fas.fa-lightbulb {
       color:#F1C300;
    }
    .far.fa-lightbulb {
       color:#fff;
    }


Result:

.. image :: Customcode_bulb.jpg

Lightbulbs color & Opacity
--------------------------

.. image :: Bulb_rgba.jpg

* Color: green
* Opacity: 0.4

::

    .fas.fa-lightbulb {
        color: rgba(0,255,0,0.4)
    }
