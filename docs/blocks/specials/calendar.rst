.. _customcalendar :

Calendar 
########

You can add a block with upcoming events from your ical-calendar (gmail, apple etc.).
You have to add the following code into the ``CONFIG.js`` file and define them as::

    var calendars = {}
    calendars.business = { maxitems: 5, url: 'https://calendar.google.com/calendar/', icalurl: 'https://calendar.google.com/calendar/ical/email%40gmail.com/public/basic.ics' }
    calendars.private = { maxitems: 5, icalurl: 'https://calendar.google.com/calendar/ical/myemail%40gmail.com/private-xxxxxxxxxxx/basic.ics' }

.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
      
  * - Parameter
    - Description
  * - maxitems
    - ``1..30``: Maximum number of calendar items to display
  * - icalurl
    - the web address to the ical-version of your calendar.
  * - url
    - (optional) The web address of the page to be shown when clicking the block.
 
And define them in a column like::

    columns[1] = {}
    columns[1]['width'] = 2;
    columns[1]['blocks'] = [calendars.business,calendars.private]

If you want to combine multiple calendars, add this code:: 

    calendars.combined = {}
    calendars.combined.maxitems = 5;
    calendars.combined.calendars = [
       { color:'white',calendar:calendars.business }, 
       { color:'#ccc',calendar:calendars.private }
    ]
    calendars.combined.url = 'https://calendar.google.com/calendar';

And define them in a column like::

    columns[1] = {}
    columns[1]['width'] = 2;
    columns[1]['blocks'] = [calendars.combined]
    
.. note :: PHP support is required. See system preparation.

Dashticz config settings
------------------------

The following config settings are applicable:

.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
      
  * - Parameter
    - Description
  * - calendarformat
    - | Configure the Calendar Date/Time format.
      | ``'dd DD.MM HH:mm'`` = default
  * - calendarlanguage
    - | Controls the calendar locale
      | ``'nl'`` , ``'en'`` , ``'hu'``, etc.

Example
-------

::

    config['calendarlanguage'] = 'nl';

    var calendars = {}
    calendars.f1 = { 
      maxitems: 6,
      url: 'https://www.f1calendar.com/#!/timezone/Europe-Amsterdam',
      icalurl: 'http://www.f1calendar.com/download/f1-calendar_p1_p2_p3_q_gp_alarm-20.ics'
    }

    //Definition of columns
    columns = {}
    columns[1] = { 
      //In this example: No blocks are defined in this column
      //This column will be empty
      blocks : [calendars.f1],
      width: 4
    }

    //Definition of screens
    screens = {}
    screens[1] = {
      columns: [1]
    }

This will give:

.. image :: calendar.jpg

Usage
-----

Google Calendar
~~~~~~~~~~~~~~~

You have to know the correct link to your Google Calendar. You can find them as follows:

* Open https://calendar.google.com/calendar
* Under 'My calendars' click on the three dots behind your calendar -> settings and sharing

* In the page that opens look for the following links:
  
  * Public URL to this calendar. It's something like:
    ``https://calendar.google.com/calendar/embed?src=yourname%40gmail.com&ctz=Europe%2FAmsterdam``

    Use this public url as url parameter in your calendar block.

  * Secret address in ICAL format. It's something like:
    ``https://calendar.google.com/calendar/ical/yourname%40gmail.com/private-5045b31...........ba/basic.ics``

    Use this ical url as icalurl parameter in your calendar block.
