.. _customweather :

Weather forecast
################

Dashticz supports two weather forecast providers:

* Weather Underground: https://www.wunderground.com/
* Open Weather Map: https://openweathermap.org/

Weather Underground doesn't provide new API-keys anymore, so new users should make use of OWM.

Open Weather Map
----------------

The OWM module provides two predefined blocks:

.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
      
  * - Block name
    - Description
  * - 'currentweather_big_owm'
    - Displays the actual weather
  * - 'weather_owm'
    - Displays the weather forecast
      
The OWM module makes use of the following CONFIG parameters:

.. list-table:: 
  :header-rows: 1
  :widths: 5, 30
  :class: tight-table
      
  * - Parameter
    - Description
  * - owm_api
    - ``'<api-key>'`` API-key provided by https://openweathermap.org/
  * - owm_city
    - | Your city or nearby city to use in OWM
      | ``'Utrecht, NL'``
  * - owm_name
    - | Name to use instead of city name
      | ``'Tuinwijk'``
  * - owm_country
    - | Your country to use in OWM
      | ``'nl'``
  * - owm_lang
    - | Set language for de description of the forecast (rain, cloudy, etc.). For available languages, see https://openweathermap.org/forecast5/#multi
      | ``''`` (empty string, default) Use Dashticz language setting
  * - owm_days
    - | ``false`` Show forecast per 3 hour interval
      | ``true`` Show daily forecast
  * - owm_cnt
    - | Number of forecast elements (3-hour intervals or days) to show
      | ``1..5``
  * - owm_min
    - | Show minimum temperature on 2nd row (only applicable if ``owm_days`` is set to ``true``
      | ``false`` / ``true``
  * - static_weathericons
    - | ``true`` Static weather settings
      | ``false`` (default) Animated weather icons 
    
Complete example::

    //Configuring the OWM parameters
    config['owm_api'] = '7c4bd2526cc4b8ed811ddfead1a557c9';
    config['owm_city'] = 'Mainaschaff';
    config['owm_name'] = '';
    config['owm_country'] = 'de';
    config['owm_lang'] = 'nl';
    config['owm_cnt'] = '3';
    config['owm_min'] = true;
    config['owm_days'] = true;
    
    //Adding OWM to a column
    columns[3] = {}
    columns[3]['blocks'] = ['currentweather_big_owm','weather_owm']
    columns[3]['width'] = 3;

.. image :: weather_owm.png


.. note :: It's not possible to use OpenWeatherMap and Weather Underground blocks simultaneously
