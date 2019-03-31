News
####

This module can display a rss feed.

A predefined modules exists with the name ``'news'``,
which can be configured with the parameter ``default_news_url``. See :ref:`newsconfig`

::

    config['default_news_url'] = 'http://www.nu.nl/rss/Algemeen';

Additional rss feeds can be defined as well. See below::

    blocks['news_tweakers'] = {
      feed: 'http://feeds.feedburner.com/tweakers/nieuws'
    }

Add the news blocks to a column as usual::

    columns[5] = {
      blocks: ['news', 'news_tweakers']      
    }


.. _newsconfig : 

Config Settings
---------------

.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
    
  * - Settings
    - Description
  * - default_news_url
    - | URL of the default news feed
      | ``'http://www.nu.nl/rss/algemeen'`` = Example for nu.nl
  * - news_scroll_after
    - | Enter the ammount in seconds (delay)
      | ``5`` = Scroll the news message every 5 seconds

Example
-------

Add the following to ``CONFIG.js``::

    config['default_news_url'] = 'http://www.nu.nl/rss/Algemeen';

    blocks['news_tweakers'] = {
      feed: 'http://feeds.feedburner.com/tweakers/nieuws'
    }

    columns[5] = {
      blocks: ['news', 'news_tweakers'],
      width: 4     
    }


    //Definition of screens
    screens = {}
    screens[1] = {
      columns: [1, 2]
    }
    screens[2] = {
      columns: [3,4]
    }

    screens[3] = {
      columns: [5]
    }

This will give on the third screen the following result:

.. image :: news.jpg

If you click on a news item, then the news article will be shown in a popup window. Not all rss-feeds support this. The news articles from Tweakers for instance are blocked.


Usage
-----

The news module will download the information via a CORS proxy. The default settings normally work fine. For configuration see :ref:`dom_CORS_proxy`        
