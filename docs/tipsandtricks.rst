Tips and Tricks
===============

Various tips and tricks will be collected here.

New button image on change of a device
--------------------------------------

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


Dashticz security
-----------------

Dashticz is not secure with it's default installation. If you want to have access to Dashticz from outside your local network, you should use a VPN connection,
or enable user authentication for the webserver you use.

If you are using Apache you can enable user authentication as follows:


Step 1
~~~~~~

First create a credentials file preferably in a location not accessible via your webbrower, for instance in ``/home/pi/dashticzpasswd``

In the terminal window type the following::

    htpasswd -c /home/pi/dashticzpasswd admin
    
and choose a password. In this example you add the user 'admin'. You can choose a different user name of course.

Step 2
~~~~~~

In your dashticz folder create a ``.htaccess`` file::

    cd /home/pi/dashticz_v2
    nano .htaccess
    
with the following content::

    AuthUserFile /home/pi/dashticzpasswd
    AuthName "Please Enter Password"
    AuthType Basic
    Require valid-user

In the first line use the location of your credentials file you created in the first step.

Step 3
~~~~~~

Enable the usage of local .htaccess files in Apache.

This step depends a bit on your Apache configuration. For a default Linux installation::

    cd /etc/apache2
    sudo nano apache2.conf
    
Now look for your web root folder. In the default setup this is ``/var/www/``. In the ``apache2.conf`` file look for::

    <Directory /var/www/>
    	Options Indexes FollowSymLinks
    	AllowOverride None
    	Require all granted
    </Directory>

Replace ``AllowOverride None`` with ``AllowOverride All``, so you should have::

    <Directory /var/www/>
      Options Indexes FollowSymLinks
      AllowOverride All
      Require all granted
    </Directory>

Save the file and restart Apache::

    sudo service apache2 restart
    
Now if you browse to Dashticz you get a prompt to enter your login credentials.



  
