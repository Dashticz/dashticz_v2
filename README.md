# Dashboard
Alternative dashboard for Domoticz




# Screenshots
![alt tag](http://i.imgur.com/A18PfG8.png)




# Installation
Before you can use this dashboard, unzip all files to a subfolder in Domoticz or on a webserver of your choice.
Save CONFIG_DEFAULT.js as CONFIG.js and insert the IP-address of Domoticz without a trailing slash; e.g.: http://192.168.1.3:8084


Visit the wikipage at: http://www.domoticz.com/wiki/Dashticz-v2




# Frequently Asked Questions

<b>How to use this dashboard if Domoticz is password protected?</b><br />
Open up CONFIG.js in a text-editor (notepad for example).
Fill in the full path for Domoticz, e.g.: http://username:password@192.168.1.3:8084 (withouth trailing slash)

<b>When Domoticz is updated, it has removed this dashboard?!</b><br />
Unfortunately, this occurs when the dashboard is installed into Domoticz's www-directory.
When Domoticz installs an update, it complete removes the www-directory, before placing the updated version back. Currently, there is no solution for this (except for installing the dashboard on another webserver), you have to re-install this dashboard.

<b>Where can I get any help?</b><br />
You can check out our helpfull community in [Dashticz topic](https://www.domoticz.com/forum/viewtopic.php?f=8&t=16526) on the Domoticz forum.
