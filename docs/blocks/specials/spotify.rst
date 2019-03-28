.. _customspotify :

Spotify
#######

Add a Spotify block to your Dashboard. 

With the Spotify block you can select a Spotify playlist, set volume, skip to next song.

The Spotify block in Dashticz is not a player, but a remote control.
That means there must be a Spotify player somewhere in your local network. This can be your laptop running the Spotify player, or a Spotify connect speaker.

.. note:: You must have a Spotify Premium account

Before you can use it, create an app on the `Spotify website <https://developer.spotify.com/dashboard/applications>`_:

    | Title: Dashticz
    | Description: whatever ;)

On the next page, copy "Client ID" to your CONFIG.js like::

  config['spot_clientid'] = '1112f16564cf4f4dsd4cbe8b52c58a44';

At the same page, enter your dashticz-url in the Redirect URIs field, for example: ``http://192.168.1.3:8080/``

.. warning :: Don't forget to push the save button!

In ``CONFIG.js``  add the block like::

    columns[2] = {}
    columns[2]['blocks'] = ['spotify']
    columns[2]['width'] = 5;

Complete example::

    config['spot_clientid'] = '1112f16564cf4f4dsd4cbe8b52c58a44';

    columns[2] = {}
    columns[2]['blocks'] = ['spotify']
    columns[2]['width'] = 5;
