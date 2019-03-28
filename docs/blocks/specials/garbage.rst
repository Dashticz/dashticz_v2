Garbage Collector
=================

If you want to have a block with next pickup dates for your garbage, add the following to ``CONFIG.js``, and change zipcode & housenumber to the correct data::

    var config ={}
    config['garbage_company'] = 'cure';
    config['garbage_icalurl'] = 0;
    config['garbage_zipcode'] = '1234AB';
    config['garbage_street'] = 'vuilnisstraat';
    config['garbage_housenumber'] = '1';
    config['garbage_maxitems'] = '12';
    config['garbage_width'] = '12';

Next, add the garbage to a column, like::

  columns[1]['blocks'] = ['garbage']


You can change the colors of the trashcan (and/or the complete line) via the parameters in ``CONFIG.js``.

Parameters
----------

=======================   ===============================
Parameter                 Description 
=======================   ===============================
garbage_company           Garbage company to use. See :ref:`garbage_companies`
garbage_icalurl           ``'<url>'``: In case the garbage company is ``url`` the URL of the ical-file.
garbage_zipcode           The zipcode
garbage_street            Your street
garbage_housenumber       Your housenumber
garbage_maxitems          Number of items to show
garbage_width             ``1..12``: Width of the block
garbage_hideicon          ``true / false``: To hide the garbage icon
garbage_use_names         ``true / false``: shows name of the garbage type
garbage_use_colors        ``true / false``: shows coloring for complete line
garbage_icon_use_colors   ``true / false``: shows colored or only white trashcan
garbage_use_cors_prefix   ``true / false``: use a CORS proxy for getting data from provider. See :ref:`dom_CORS_proxy`
garbage_mapping           Translation from description of the pickup event to a garbage type.  See :ref:`par_garbage`.
garbage                   Settings for different garbage types. See :ref:`par_garbage`.
=======================   ===============================

Usage
-----

.. note:: Garbage collector requires beta 2.4.4 or higher.

Instead of running these requests from the site https://dashticz.nl (free of charge donated by the initiator of Dashticz), the user has to take care of this process by running a PHP-server of choice, locally or remote.
See :ref:`Installation`.

.. _par_garbage :

Garbage type, color and icon
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Dashticz uses two steps to show the garbage pickup type with the correct icon, text and coloring.

#. Garbage type detection. Configurable via parameter ``garbage_mapping``
#. Settings (color, icon) per carbage type. Configurable via parameter ``garbage``

To determine the garbage type Dashticz searches for certain text in the description of the garbage pickup event. Example for the default definition::

    config['garbage_mapping'] = {
        rest: ['grof', 'grey', 'rest', 'grijs','grijze'],
        gft: ['gft', 'tuin', 'refuse bin', 'green', 'groen', 'Biodégradables', 'snoei'],
        pmd: ['plastic', 'pmd', 'verpakking', 'kunststof', 'valorlux'],
        papier: ['papier', 'blauw', 'blue', 'recycling bin collection'],
        kca: ['chemisch', 'kca','kga'],
        brown: ['brown', 'verre'],
        black: ['black', 'zwart'],
        milieu: ['milieu'],
        kerstboom: ['kerst'],
    };

As you can see 9 different garbage types have been defined.
Looking at the first line of the garbage mapping: If the description of the pickup event contains the text ``grey`` the garbage type ``rest`` will be selected.

.. note :: The first rule that has a match with the event description will be selected.

After the mapping on a garbage type, the name, color and icon can be configured per garbage type as follows::

    config['garbage'] = {
        gft: {kliko: 'green', code: '#375b23', name: 'GFT', icon: 'img/garbage/kliko_green.png'},
        pmd: {kliko: 'orange', code: '#db5518', name: 'PMD', icon: 'img/garbage/kliko_orange.png'},
        rest: {kliko: 'grey', code: '#5e5d5c', name: 'Restafval', icon: 'img/garbage/kliko_grey.png'},
        papier: {kliko: 'blue', code: '#153477', name: 'Papier', icon: 'img/garbage/kliko_blue.png'},
        kca: {kliko: 'red', code: '#b21807', name: 'Chemisch afval', icon: 'img/garbage/kliko_red.png'},
        brown: {kliko: 'brown', code: '#7c3607', name: 'Bruin', icon: 'img/garbage/kliko_brown.png'},
        black: {kliko: 'black', code: '#000000', name: 'Zwart', icon: 'img/garbage/kliko_black.png'},
        milieu: {kliko: 'yellow', code: '#f9e231', name: 'Geel', icon: 'img/garbage/kliko_yellow.png'},
        kerstboom: {kliko: 'green', code: '#375b23', name: 'Kerstboom', icon: 'img/garbage/tree.png'},
    };

The two examples above show the default definition of the ``garbage_mapping`` and ``garbage`` parameters. 
You can redefine them in your ``CONFIG.js``.


.. _garbage_companies :

Currently supported cities/companies/services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

===================     =========================
Company                 City or area
===================     =========================
googlecalendar ical     file in iCal format
ophaalkalender          Ophaalkalender (BE)
edg                     EDG (DE)
deafvalapp              Afval App (NL)
afvalalert
afvalwijzerarnhem       Afvalwijzer Arnhem (NL)
almere                  Almere (NL)
alphenaandenrijn        Alphen aan de Rijn (NL)
area
avalex                  Avalex (NL)
gemeenteberkelland      Berkelland (NL)
best                    Best (NL)
circulusberkel          Circulus Berkel (NL)
cure                    Cure (NL)
cyclusnv                Cyclus NV (NL)
deurne                  Deurne (NL)
dar                     Dar (NL)
gemertbakelmaandag      Gemert-Bakel, maandag (NL)  
gemertbakeldinsdag      Gemert-Bakel, dinsdag (NL)  
gemertbakelwoensdag     Gemert-Bakel, woensdag (NL)  
goes                    Goes (NL)  
groningen               Groningen (NL)  
heezeleende  
hvc                     HVC Groep (NL)  
meerlanden              Meerlanden (NL)  
mijnafvalwijzer         Mijn Afval Wijzer (NL)  
rd4  
recyclemanager          Recycle Manager  
rmn                     RMN (NL)  
rova                    Rova (NL)  
sudwestfryslan          Sudwest Fryslan (NL)  
twentemilieu            Twente Milieu (NL)  
uden                    Uden (NL)  
veldhoven               Veldhoven (NL)  
venlo                   Venlo (NL)  
venray                  Venray (NL)  
vianen                  Vianen (NL)  
waalre                  Waalre (NL)  
zuidhornical            Zuidhoorn (NL)  
zuidhorn                Zuidhoorn (NL)  
===================     =========================
