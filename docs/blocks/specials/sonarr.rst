

Sonarr
######

.. note :: Not tested. Please leave a note in the Dashticz Support Forum if this module is working correctly.

Show your current series within the Dashboard.

Add to config.js::

    config['sonarr_url'] = 'http://sonarrserver:8989';
    config['sonarr_apikey'] = '000000000000000000000000000000';
    config['sonarr_maxitems'] = 8;

AND in the columns, add::

    columns[1]['blocks'] = ['sonarr']

If you want to use extra options, add this to config::

    blocks['sonarr'] = {}
    blocks['sonarr']['title'] = 'Sonarr';
    blocks['sonarr']['width'] = 8;
    blocks['sonarr']['title_position'] = 'left';
    blocks['sonarr']['view'] = 'banner';
