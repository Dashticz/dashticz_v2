.. _SystemSetup :

System preparation
------------------

Since Beta 2.4.6 (October 2018) the installation instruction changed. Main reason is that for most functionality PHP support in the web server is needed. The Domoticz web server doesn't support PHP. That means that Dashticz needs to be installed under a different web server with PHP enabled. 
The installation instruction consists in two steps:


Installation of a web server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This example shows installation of Apache on Raspberry in it's most basic configuration: running at port 80.
Besides Apache also PHP needs to be installed, since it's used by the Calendar and Garbage module in Dashticz.

.. code-block:: bash

    sudo apt-get update
    sudo apt-get install apache2 php php-xml php-curl libapache2-mod-php
    sudo systemctl restart apache2

.. note:: On some Raspberry configurations the installation of php is failing. In that case you can try the alternative installs under Advanced Installation below

Now check whether Apache is running by browsing to ``http://<YOUR IP>``
You should see the Apache demo page.

Alternative installations
^^^^^^^^^^^^^^^^^^^^^^^^^

For debian/stretch:

- https://tecadmin.net/install-php-debian-9-stretch/ (PHP installation instructions)]. 
