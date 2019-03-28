.. _DashticzInstallation :

Dashticz Installation 
---------------------------
Example for Raspberry PI running Apache web server:
Assumption:

* Apache is running at ``http://192.168.1.3`` on the default port 80 (but this can be any IP:port address)
* Domoticz is running at ``http://192.168.1.3:8084``

First clone the dashticz repository to a folder of your choice:

.. code-block:: bash

    cd /home/pi
    git clone https://github.com/robgeerts/dashticz_v2 --branch beta

After the installation is finished, go to the ``/home/pi/dashticz_v2/custom/`` folder, copy the CONFIG_DEFAULT.js file to CONFIG.js (mind the CAPITALS!), and edit it with the basics:

.. code-block:: bash

    cd dashticz_v2/custom/
    cp CONFIG_DEFAULT.js CONFIG.js
    nano CONFIG.js

Example of CONFIG.js:

.. code-block:: javascript

    var config = {}
    config['language'] = 'nl_NL'; //or: en_US, de_DE, fr_FR, hu_HU, it_IT, pt_PT, sv_SV
    config['domoticz_ip'] = 'http://192.168.1.3:8084';
    config['domoticz_refresh'] = '5';
    config['dashticz_refresh'] = '60';

You can read more about the connection configurtion :ref:`config-connection`.

Then create a symbolic link from the root of the www folder of your web server to the previously created Dashticz location::

  sudo ln -s /home/pi/dashticz_v2/ /var/www/html

Set the correct permissions to the files and folders::

  chmod -R a+rX /home/pi/dashticz_v2

If you want to be able to save the settings via Dashticz to CONFIG.js then you have to give write permission to CONFIG.js for root::

  chmod a+w /home/pi/dashticz_v2/custom/CONFIG.js

Now you can browse to the dashboard: http://192.168.1.3/dashticz_v2/index.html
Replace 192.168.1.3 with the IP Address (and Port number) for your web server, NOT your Domoticz IP!

By default, Dashticz V2 will show all your Domoticz favorites on the dashboard.
