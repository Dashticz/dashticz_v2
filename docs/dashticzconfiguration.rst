Dashticz setup
==============

Dashticz v2.0 can be configured by editing the ``CONFIG.js`` file.
This file you can find in the subfolder ``[dashticz]/custom``.

.. note:: TIP! If CUSTOM POSITIONING is not working check if you have uncomment all lines from the blocks/colums/screens you want.

In the following part, the ``CONFIG.js`` is divided in sections. For each section there will be an explanation how to use.

    .. _config-connection:

Connection
##########
Below the basic configuration to make the connection with Domoticz work.

.. code-block:: bash

    var config = {}
    config['language'] = 'nl_NL'; //or: en_US, de_DE, fr_FR, hu_HU, it_IT, pt_PT, sv_SE
    config['domoticz_ip'] = 'http://192.168.1.3:8084';
    config['domoticz_refresh'] = '5';
    config['dashticz_refresh'] = '60';


==========================        =============
Parameter                         Description
==========================        =============
config['language']                can be used to select the language, Dutch (nl_NL), English (en_US), German (de_DE),French (fr_FR), Hungarian (hu_HU), Italian (it_IT), Portuguese (pt_PT), or Swedish (sv_SV)

config['domoticz_ip']             is the URL to your Domoticz installation (with the correct PORT address)
config['domoticz_refresh']        the refresh rate of Dashticz v2.0 to get information from Domoticz
config['dashticz_refresh']        the refresh rate of the Dashticz v2.0 Dashboard
==========================        =============

Config params
#############

domoticz_ip
-----------
``String`` Default: ''

IP Address and Portnumber of your Domoticz installation


user_name
---------
``String`` Default ''

Domoticz username

pass_word
---------
``String`` Default ''

Domoticz password


loginEnabled
------------
``Number`` Default 0
Possible values: 0 or 1

Enable if you want a login form to dashticz

Usage
#####

.. _dom_CORS_proxy:

CORS proxy
------------

Text to be added ...
