NZBGet
######

.. note :: Not tested. Please leave a note in the Dashticz Support Forum if this module is working correctly.

Show your current downloads within the Dashboard.

Add to config.js::

    var _HOST_NZBGET = 'http://192.168.1.3:6789';

AND in the blocks, add::

    columns[1]['blocks'] = ['nzbget']

If you want to use other widths, add this to config::

    blocks['nzbget'] = {}
    blocks['nzbget']['width'] = 12;
    blocks['nzbget']['downloads_width'] = 6;
