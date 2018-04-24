# Dashticz v2
Alternative dashboard for Domoticz




# Screenshots
![alt tag](http://i.imgur.com/9DBcpNd.jpg)




# Installation
Before you can use this dashboard, unzip all files to a subfolder in Domoticz or on a webserver of your choice.
Save CONFIG_DEFAULT.js as CONFIG.js and insert the IP-address of Domoticz without a trailing slash; e.g.: http://192.168.1.3:8084


Visit the wikipage at: http://www.domoticz.com/wiki/Dashticz_V2

# Run in Docker
Navigate the directory to be in the same level as the Dockerfile and run this command
- `docker build -t docker-dashticz .`
- `docker run -p 7000:90 -v ${PWD}:/usr/share/nginx/html/ docker-dashticz`

Dashticz will now be available on [http://localhost:7000]()


# Donate
Do you appreciate my work and want to buy me a beer? You can send Verge (XVG) to <b>D8fwNbyV6YxJk1aSiXftWTtdaPipsKn2Fa</b>, Bitcoins to <b>17Qy4bsLM9J238fCZt5kaRc2bD5S1Aw6og</b> or donate via PayPal: https://www.paypal.me/robgeerts


# Frequently Asked Questions

### How to use this dashboard if Domoticz is password protected?
Open up CONFIG.js in a text-editor (notepad for example).
Fill in the full path for Domoticz, e.g.: http://username:password@192.168.1.3:8084 (withouth trailing slash)

### When Domoticz is updated, it has removed this dashboard?!
Unfortunately, this occurs when the dashboard is installed into Domoticz's www-directory.
When Domoticz installs an update, it removes the www-directory completely, before placing the updated version back. 
You'll have to re-install Dashticz in that case.

#### There are a few solutions to this:
- Install dashticz on another web server
- Make a symlink in the `www` folder in Domoticz: 
  - Install or copy Dashticz to a folder outside the Domoticz folder, i.e. `/home/pi/dashticz_v2/`
  - Make a symlink: `ln -s /home/pi/dashticz_v2/ /home/pi/domoticz/www/dashticz`
  - Now you can access Dashticz on `http://domoticz_ip:port/dashticz/index.html`
  - After a Domoticz update, you only need to make the symlink again.

### Where can I get any help?
You can check out our helpful community in the [Dashticz subforum](https://www.domoticz.com/forum/viewforum.php?f=67) on the Domoticz forum. Various topics on the various parts of Dashticz can give you lots of help and examples on configuration. Feel free to ask you question.
See also the [Wiki](http://www.domoticz.com/wiki/Dashticz_V2) for the various options in dashticz.

### Contribute to Dashticz
If you want to contribute to Dashticz: Just create a pull request with you bugfix, addition, typofix or something else you think is valuable. If you have no idea of what to fix: Look at the issues on Github, or visit the [Dashticz subforum](https://www.domoticz.com/forum/viewforum.php?f=67) where users describing bugs or requesting features can be found.

Improving the [Wiki](http://www.domoticz.com/wiki/Dashticz_V2) is also a good way to contribute.

Thanks for your help!
