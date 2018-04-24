var settingList = {};
settingList['general'] = {};
settingList['general']['title'] = language.settings.general.title;

settingList['general']['domoticz_ip'] = {};
settingList['general']['domoticz_ip']['title'] = language.settings.general.domoticz_ip;
settingList['general']['domoticz_ip']['type'] = 'text';
settingList['general']['domoticz_ip']['help'] = language.settings.general.domoticz_ip_help;

settingList['general']['loginEnabled'] = {};
settingList['general']['loginEnabled']['title'] = language.settings.general.loginEnabled;
settingList['general']['loginEnabled']['type'] = 'checkbox';

settingList['general']['user_name'] = {};
settingList['general']['user_name']['title'] = language.settings.general.user_name;
settingList['general']['user_name']['type'] = 'text';
settingList['general']['user_name']['help'] = language.settings.general.user_name_help;

settingList['general']['pass_word'] = {};
settingList['general']['pass_word']['title'] = language.settings.general.pass_word;
settingList['general']['pass_word']['type'] = 'text';

settingList['general']['app_title'] = {};
settingList['general']['app_title']['title'] = language.settings.general.app_title;
settingList['general']['app_title']['type'] = 'text';

settingList['general']['no_rgb'] = {};
settingList['general']['no_rgb']['title'] = language.settings.general.no_rgb;
settingList['general']['no_rgb']['type'] = 'checkbox';

settingList['general']['auto_positioning'] = {};
settingList['general']['auto_positioning']['title'] = language.settings.general.auto_positioning;
settingList['general']['auto_positioning']['type'] = 'checkbox';
settingList['general']['auto_positioning']['help'] = language.settings.general.auto_positioning_help;

settingList['general']['use_favorites'] = {};
settingList['general']['use_favorites']['title'] = language.settings.general.use_favorites;
settingList['general']['use_favorites']['type'] = 'checkbox';
settingList['general']['use_favorites']['help'] = language.settings.general.use_favorites_help;

settingList['general']['room_plan'] = {};
settingList['general']['room_plan']['title'] = language.settings.general.room_plan;
settingList['general']['room_plan']['type'] = 'text';
settingList['general']['room_plan']['help'] = language.settings.general.room_plan_help;

settingList['general']['domoticz_refresh'] = {};
settingList['general']['domoticz_refresh']['title'] = language.settings.general.domoticz_refresh;
settingList['general']['domoticz_refresh']['type'] = 'text';

settingList['general']['disable_googleanalytics'] = {};
settingList['general']['disable_googleanalytics']['title'] = language.settings.general.disable_googleanalytics;
settingList['general']['disable_googleanalytics']['help'] = language.settings.general.disable_googleanalytics_help;
settingList['general']['disable_googleanalytics']['type'] = 'checkbox';

settingList['general']['dashticz_refresh'] = {};
settingList['general']['dashticz_refresh']['title'] = language.settings.general.dashticz_refresh;
settingList['general']['dashticz_refresh']['type'] = 'text';

settingList['general']['last_update'] = {};
settingList['general']['last_update']['title'] = language.settings.general.last_update;
settingList['general']['last_update']['type'] = 'checkbox';

settingList['general']['default_news_url'] = {};
settingList['general']['default_news_url']['title'] = language.settings.general.default_news_url;
settingList['general']['default_news_url']['type'] = 'text';

settingList['general']['news_scroll_after'] = {};
settingList['general']['news_scroll_after']['title'] = language.settings.general.news_scroll_after;
settingList['general']['news_scroll_after']['type'] = 'text';

/*
settingList['general']['hide_off_button'] = {}
settingList['general']['hide_off_button']['title'] = language.settings.general.hide_off_button;
settingList['general']['hide_off_button']['type'] = 'checkbox';
*/

settingList['screen'] = {};
settingList['screen']['title'] = language.settings.screen.title;

settingList['screen']['hide_topbar'] = {};
settingList['screen']['hide_topbar']['title'] = language.settings.screen.hide_topbar;
settingList['screen']['hide_topbar']['type'] = 'checkbox';

settingList['screen']['theme'] = {};
settingList['screen']['theme']['title'] = language.settings.screen.dashticz_themes;
settingList['screen']['theme']['type'] = 'text';
settingList['screen']['theme']['help'] = language.settings.screen.dashticz_themes_help;

settingList['screen']['background_image'] = {};
settingList['screen']['background_image']['title'] = language.settings.screen.background_image;
settingList['screen']['background_image']['type'] = 'text';
settingList['screen']['background_image']['help'] = language.settings.screen.background_image.help;

settingList['screen']['standby_after'] = {};
settingList['screen']['standby_after']['title'] = language.settings.screen.standby_after;
settingList['screen']['standby_after']['type'] = 'text';

settingList['screen']['auto_swipe_back_to'] = {};
settingList['screen']['auto_swipe_back_to']['title'] = language.settings.screen.auto_swipe_back_to;
settingList['screen']['auto_swipe_back_to']['type'] = 'text';
settingList['screen']['auto_swipe_back_to']['help'] = language.settings.screen.auto_swipe_back_to_help;

settingList['screen']['auto_swipe_back_after'] = {};
settingList['screen']['auto_swipe_back_after']['title'] = language.settings.screen.auto_swipe_back_after;
settingList['screen']['auto_swipe_back_after']['type'] = 'text';

settingList['screen']['auto_slide_pages'] = {};
settingList['screen']['auto_slide_pages']['title'] = language.settings.screen.auto_slide_pages;
settingList['screen']['auto_slide_pages']['type'] = 'text';

settingList['screen']['slide_effect'] = {};
settingList['screen']['slide_effect']['title'] = language.settings.screen.slide_effect;
settingList['screen']['slide_effect']['type'] = 'select';
settingList['screen']['slide_effect']['options'] = {};
settingList['screen']['slide_effect']['options']['slide'] = 'slide';
settingList['screen']['slide_effect']['options']['fade'] = 'fade';
settingList['screen']['slide_effect']['options']['cube'] = 'cube';
settingList['screen']['slide_effect']['options']['coverflow'] = 'coverflow';
settingList['screen']['slide_effect']['options']['flip'] = 'flip';

settingList['screen']['standard_graph'] = {};
settingList['screen']['standard_graph']['title'] = language.settings.screen.standard_graph;
settingList['screen']['standard_graph']['type'] = 'select';
settingList['screen']['standard_graph']['options'] = {};
settingList['screen']['standard_graph']['options']['hours'] = language.graph.last_hours;
settingList['screen']['standard_graph']['options']['month'] = language.graph.last_month;
settingList['screen']['standard_graph']['options']['day'] = language.graph.today;

settingList['screen']['edit_mode'] = {};
settingList['screen']['edit_mode']['title'] = language.settings.screen.edit_mode;
settingList['screen']['edit_mode']['type'] = 'checkbox';

settingList['localize'] = {};
settingList['localize']['title'] = language.settings.localize.title;

settingList['localize']['language'] = {};
settingList['localize']['language']['title'] = language.settings.localize.language;
settingList['localize']['language']['type'] = 'select';
settingList['localize']['language']['options'] = {};
settingList['localize']['language']['options']['zh_CN'] = language.settings.localize.cn;
settingList['localize']['language']['options']['cs_CZ'] = language.settings.localize.cs;
settingList['localize']['language']['options']['da_DK'] = language.settings.localize.da;
settingList['localize']['language']['options']['de_DE'] = language.settings.localize.de;
settingList['localize']['language']['options']['en_US'] = language.settings.localize.en;
settingList['localize']['language']['options']['es_ES'] = language.settings.localize.es;
settingList['localize']['language']['options']['fi_FI'] = language.settings.localize.fi;
settingList['localize']['language']['options']['fr_FR'] = language.settings.localize.fr;
settingList['localize']['language']['options']['hu_HU'] = language.settings.localize.hu;
settingList['localize']['language']['options']['it_IT'] = language.settings.localize.it;
settingList['localize']['language']['options']['nl_NL'] = language.settings.localize.nl;
settingList['localize']['language']['options']['nn_NO'] = language.settings.localize.no;
settingList['localize']['language']['options']['pl_PL'] = language.settings.localize.pl;
settingList['localize']['language']['options']['pt_PT'] = language.settings.localize.pt;
settingList['localize']['language']['options']['ru_RU'] = language.settings.localize.ru;
settingList['localize']['language']['options']['sk_SK'] = language.settings.localize.sk;
settingList['localize']['language']['options']['sl_SL'] = language.settings.localize.sl;
settingList['localize']['language']['options']['sv_SE'] = language.settings.localize.sv;
settingList['localize']['language']['options']['uk_UA'] = language.settings.localize.uk;

settingList['localize']['timeformat'] = {};
settingList['localize']['timeformat']['title'] = language.settings.localize.timeformat;
settingList['localize']['timeformat']['type'] = 'text';

settingList['localize']['calendarformat'] = {};
settingList['localize']['calendarformat']['title'] = language.settings.localize.calendarformat;
settingList['localize']['calendarformat']['type'] = 'text';

settingList['localize']['calendarlanguage'] = {};
settingList['localize']['calendarlanguage']['title'] = language.settings.localize.calendarlanguage;
settingList['localize']['calendarlanguage']['type'] = 'select';
settingList['localize']['calendarlanguage']['options'] = {};
settingList['localize']['calendarlanguage']['options']['zh_CN'] = language.settings.localize.cn;
settingList['localize']['calendarlanguage']['options']['da_DK'] = language.settings.localize.da;
settingList['localize']['calendarlanguage']['options']['de_DE'] = language.settings.localize.de;
settingList['localize']['calendarlanguage']['options']['en_US'] = language.settings.localize.en;
settingList['localize']['calendarlanguage']['options']['es_ES'] = language.settings.localize.es;
settingList['localize']['calendarlanguage']['options']['fi_FI'] = language.settings.localize.fi;
settingList['localize']['calendarlanguage']['options']['fr_FR'] = language.settings.localize.fr;
settingList['localize']['calendarlanguage']['options']['hu_HU'] = language.settings.localize.hu;
settingList['localize']['calendarlanguage']['options']['it_IT'] = language.settings.localize.it;
settingList['localize']['calendarlanguage']['options']['nl_NL'] = language.settings.localize.nl;
settingList['localize']['calendarlanguage']['options']['nn_NO'] = language.settings.localize.no;
settingList['localize']['calendarlanguage']['options']['pl_PL'] = language.settings.localize.pl;
settingList['localize']['calendarlanguage']['options']['pt_PT'] = language.settings.localize.pt;
settingList['localize']['calendarlanguage']['options']['ru_RU'] = language.settings.localize.ru;
settingList['localize']['calendarlanguage']['options']['sk_SK'] = language.settings.localize.sk;
settingList['localize']['calendarlanguage']['options']['sl_SL'] = language.settings.localize.sl;
settingList['localize']['calendarlanguage']['options']['sv_SE'] = language.settings.localize.sv;
settingList['localize']['calendarlanguage']['options']['uk_UA'] = language.settings.localize.uk;

settingList['localize']['calendarurl'] = {};
settingList['localize']['calendarurl']['title'] = language.settings.localize.calendarurl;
settingList['localize']['calendarurl']['type'] = 'text';

settingList['localize']['hide_seconds'] = {};
settingList['localize']['hide_seconds']['title'] = language.settings.localize.hide_seconds;
settingList['localize']['hide_seconds']['type'] = 'checkbox';

settingList['localize']['hide_seconds_stationclock'] = {};
settingList['localize']['hide_seconds_stationclock']['title'] = language.settings.localize.hide_seconds_stationclock;
settingList['localize']['hide_seconds_stationclock']['type'] = 'checkbox';

settingList['localize']['boss_stationclock'] = {};
settingList['localize']['boss_stationclock']['title'] = language.settings.localize.boss_stationclock;
settingList['localize']['boss_stationclock']['type'] = 'text';

settingList['localize']['gm_api'] = {};
settingList['localize']['gm_api']['title'] = language.settings.localize.gm_api;
settingList['localize']['gm_api']['type'] = 'text';

settingList['localize']['gm_zoomlevel'] = {};
settingList['localize']['gm_zoomlevel']['title'] = language.settings.localize.gm_zoomlevel;
settingList['localize']['gm_zoomlevel']['type'] = 'text';

settingList['localize']['gm_latitude'] = {};
settingList['localize']['gm_latitude']['title'] = language.settings.localize.gm_latitude;
settingList['localize']['gm_latitude']['type'] = 'text';

settingList['localize']['gm_longitude'] = {};
settingList['localize']['gm_longitude']['title'] = language.settings.localize.gm_longitude;
settingList['localize']['gm_longitude']['type'] = 'text';

settingList['localize']['speak_lang'] = {};
settingList['localize']['speak_lang']['title'] = language.settings.localize.speak_language;
settingList['localize']['speak_lang']['type'] = 'select';
settingList['localize']['speak_lang']['options'] = {};
settingList['localize']['speak_lang']['options']['de-DE'] = language.settings.localize.de;
settingList['localize']['speak_lang']['options']['en-US'] = language.settings.localize.en;
settingList['localize']['speak_lang']['options']['es-ES'] = language.settings.localize.es;
settingList['localize']['speak_lang']['options']['fr-FR'] = language.settings.localize.fr;
settingList['localize']['speak_lang']['options']['it-IT'] = language.settings.localize.it;
settingList['localize']['speak_lang']['options']['nl-NL'] = language.settings.localize.nl;
settingList['localize']['speak_lang']['options']['pl-PL'] = language.settings.localize.pl;
settingList['localize']['speak_lang']['options']['ru-RU'] = language.settings.localize.ru;

settingList['weather'] = {};
settingList['weather']['title'] = language.settings.weather.title;

settingList['weather']['wu_api'] = {};
settingList['weather']['wu_api']['title'] = language.settings.weather.wu_api;
settingList['weather']['wu_api']['type'] = 'text';

settingList['weather']['wu_city'] = {};
settingList['weather']['wu_city']['title'] = language.settings.weather.wu_city;
settingList['weather']['wu_city']['type'] = 'text';

settingList['weather']['wu_name'] = {};
settingList['weather']['wu_name']['title'] = language.settings.weather.wu_name;
settingList['weather']['wu_name']['type'] = 'text';

settingList['weather']['wu_country'] = {};
settingList['weather']['wu_country']['title'] = language.settings.weather.wu_country;
settingList['weather']['wu_country']['type'] = 'text';

settingList['weather']['idx_moonpicture'] = {};
settingList['weather']['idx_moonpicture']['title'] = language.settings.weather.idx_moonpicture;
settingList['weather']['idx_moonpicture']['type'] = 'text';
settingList['weather']['idx_moonpicture']['help'] = language.settings.weather.idx_moonpicture_help;

settingList['weather']['use_fahrenheit'] = {};
settingList['weather']['use_fahrenheit']['title'] = language.settings.weather.use_fahrenheit;
settingList['weather']['use_fahrenheit']['type'] = 'checkbox';

settingList['weather']['use_beaufort'] = {};
settingList['weather']['use_beaufort']['title'] = language.settings.weather.use_beaufort;
settingList['weather']['use_beaufort']['type'] = 'checkbox';

settingList['weather']['translate_windspeed'] = {};
settingList['weather']['translate_windspeed']['title'] = language.settings.weather.translate_windspeed;
settingList['weather']['translate_windspeed']['type'] = 'checkbox';
settingList['weather']['translate_windspeed']['help'] = language.settings.weather.translate_windspeed_help;

settingList['weather']['static_weathericons'] = {};
settingList['weather']['static_weathericons']['title'] = language.settings.weather.static_weathericons;
settingList['weather']['static_weathericons']['type'] = 'checkbox';

settingList['media'] = {};
settingList['media']['title'] = language.settings.media.title;

settingList['media']['switch_horizon'] = {};
settingList['media']['switch_horizon']['title'] = language.settings.media.switch_horizon;
settingList['media']['switch_horizon']['type'] = 'text';
settingList['media']['switch_horizon']['help'] = language.settings.media.switch_horizon_help;

settingList['media']['host_nzbget'] = {};
settingList['media']['host_nzbget']['title'] = language.settings.media.host_nzbget;
settingList['media']['host_nzbget']['type'] = 'text';
settingList['media']['host_nzbget']['help'] = language.settings.media.host_nzbget_help;

settingList['media']['spot_clientid'] = {};
settingList['media']['spot_clientid']['title'] = language.settings.media.spot_clientid;
settingList['media']['spot_clientid']['type'] = 'text';

settingList['media']['sonarr_url'] = {};
settingList['media']['sonarr_url']['title'] = language.settings.media.sonarr_url;
settingList['media']['sonarr_url']['type'] = 'text';

settingList['media']['sonarr_apikey'] = {};
settingList['media']['sonarr_apikey']['title'] = language.settings.media.sonarr_apikey;
settingList['media']['sonarr_apikey']['type'] = 'text';

settingList['media']['sonarr_maxitems'] = {};
settingList['media']['sonarr_maxitems']['title'] = language.settings.media.sonarr_maxitems;
settingList['media']['sonarr_maxitems']['type'] = 'text';

settingList['media']['hide_mediaplayer'] = {};
settingList['media']['hide_mediaplayer']['title'] = language.settings.media.hide_mediaplayer;
settingList['media']['hide_mediaplayer']['type'] = 'checkbox';

settingList['garbage'] = {};
settingList['garbage']['title'] = language.settings.garbage.title;

settingList['garbage']['garbage_company'] = {};
settingList['garbage']['garbage_company']['title'] = language.settings.garbage.garbage_company;
settingList['garbage']['garbage_company']['type'] = 'select';
settingList['garbage']['garbage_company']['options'] = {};
settingList['garbage']['garbage_company']['options']['afvalalert'] = 'Afval Alert (NL)';
settingList['garbage']['garbage_company']['options']['almere'] = 'Almere';
settingList['garbage']['garbage_company']['options']['area'] = 'Area';
settingList['garbage']['garbage_company']['options']['ical'] = 'iCal';
settingList['garbage']['garbage_company']['options']['googlecalendar'] = 'Google Calender';
settingList['garbage']['garbage_company']['options']['ophaalkalender'] = 'Ophaalkalender (BE)';
settingList['garbage']['garbage_company']['options']['edg'] = 'EDG (DE)';
settingList['garbage']['garbage_company']['options']['deafvalapp'] = 'Afval App (NL)';
settingList['garbage']['garbage_company']['options']['afvalwijzerarnhem'] = 'Afvalwijzer Arnhem (NL)';
settingList['garbage']['garbage_company']['options']['alphenaandenrijn'] = 'Alphen aan de Rijn (NL)';
settingList['garbage']['garbage_company']['options']['avalex'] = 'Avalex (NL)';
settingList['garbage']['garbage_company']['options']['gemeenteberkelland'] = 'Berkelland (NL)';
settingList['garbage']['garbage_company']['options']['best'] = 'Best (NL)';
settingList['garbage']['garbage_company']['options']['circulusberkel'] = 'Circulus Berkel (NL)';
settingList['garbage']['garbage_company']['options']['cure'] = 'Cure (NL)';
settingList['garbage']['garbage_company']['options']['cyclusnv'] = 'Cyclus NV (NL)';
settingList['garbage']['garbage_company']['options']['dar'] = 'Dar (NL)';
settingList['garbage']['garbage_company']['options']['gemertbakelmaandag'] = 'Gemert-Bakel, maandag (NL)';
settingList['garbage']['garbage_company']['options']['gemertbakeldinsdag'] = 'Gemert-Bakel, dinsdag (NL)';
settingList['garbage']['garbage_company']['options']['gemertbakelwoensdag'] = 'Gemert-Bakel, woensdag (NL)';
settingList['garbage']['garbage_company']['options']['goes'] = 'Goes (NL)';
settingList['garbage']['garbage_company']['options']['hvc'] = 'HVC Groep (NL)';
settingList['garbage']['garbage_company']['options']['meerlanden'] = 'Meerlanden (NL)';
settingList['garbage']['garbage_company']['options']['mijnafvalwijzer'] = 'Mijn Afval Wijzer (NL)';
settingList['garbage']['garbage_company']['options']['recyclemanager'] = 'Recycle Manager';
settingList['garbage']['garbage_company']['options']['rd4'] = 'Rd4';
settingList['garbage']['garbage_company']['options']['rmn'] = 'RMN (NL)';
settingList['garbage']['garbage_company']['options']['rova'] = 'Rova (NL)';
settingList['garbage']['garbage_company']['options']['sudwestfryslan'] = 'Sudwest Fryslan (NL)';
settingList['garbage']['garbage_company']['options']['twentemilieu'] = 'Twente Milieu (NL)';
settingList['garbage']['garbage_company']['options']['uden'] = 'Uden (NL)';
settingList['garbage']['garbage_company']['options']['veldhoven'] = 'Veldhoven (NL)';
settingList['garbage']['garbage_company']['options']['venlo'] = 'Venlo (NL)';
settingList['garbage']['garbage_company']['options']['vianen'] = 'Vianen (NL)';
settingList['garbage']['garbage_company']['options']['waalre'] = 'Waalre (NL)';

settingList['garbage']['garbage_icalurl'] = {};
settingList['garbage']['garbage_icalurl']['title'] = language.settings.garbage.garbage_icalurl;
settingList['garbage']['garbage_icalurl']['type'] = 'text';

settingList['garbage']['google_api_key'] = {};
settingList['garbage']['google_api_key']['title'] = language.settings.garbage.google_api_key;
settingList['garbage']['google_api_key']['type'] = 'text';
settingList['garbage']['google_api_key' ]['help'] = language.settings.garbage.google_api_key_help;

settingList['garbage']['garbage_calendar_id'] = {};
settingList['garbage']['garbage_calendar_id']['title'] = language.settings.garbage.garbage_calendar_id;
settingList['garbage']['garbage_calendar_id']['type'] = 'text';
settingList['garbage']['garbage_calendar_id' ]['help'] = language.settings.garbage.garbage_calendar_id_help;

settingList['garbage']['garbage_zipcode'] = {};
settingList['garbage']['garbage_zipcode']['title'] = language.settings.garbage.garbage_zipcode;
settingList['garbage']['garbage_zipcode']['type'] = 'text';

settingList['garbage']['garbage_street'] = {};
settingList['garbage']['garbage_street']['title'] = language.settings.garbage.garbage_street;
settingList['garbage']['garbage_street']['type'] = 'text';

settingList['garbage']['garbage_housenumber'] = {};
settingList['garbage']['garbage_housenumber']['title'] = language.settings.garbage.garbage_housenumber;
settingList['garbage']['garbage_housenumber']['type'] = 'text';

settingList['garbage']['garbage_housenumberadd'] = {};
settingList['garbage']['garbage_housenumberadd']['title'] = language.settings.garbage.garbage_housenumberaddition;
settingList['garbage']['garbage_housenumberadd']['type'] = 'text';

settingList['garbage']['garbage_maxitems'] = {};
settingList['garbage']['garbage_maxitems']['title'] = language.settings.garbage.garbage_maxitems;
settingList['garbage']['garbage_maxitems']['type'] = 'text';

settingList['garbage']['garbage_width'] = {};
settingList['garbage']['garbage_width']['title'] = language.settings.garbage.garbage_width;
settingList['garbage']['garbage_width']['type'] = 'text';

settingList['garbage']['garbage_hideicon'] = {};
settingList['garbage']['garbage_hideicon']['title'] = language.settings.garbage.garbage_hideicon;
settingList['garbage']['garbage_hideicon']['type'] = 'checkbox';

settingList['garbage']['garbage_icon_use_colors'] = {};
settingList['garbage']['garbage_icon_use_colors']['title'] = language.settings.garbage.garbage_icon_use_colors;
settingList['garbage']['garbage_icon_use_colors']['type'] = 'checkbox';

settingList['garbage']['garbage_use_colors'] = {};
settingList['garbage']['garbage_use_colors']['title'] = language.settings.garbage.garbage_use_colors;
settingList['garbage']['garbage_use_colors']['type'] = 'checkbox';

settingList['garbage']['garbage_use_names'] = {};
settingList['garbage']['garbage_use_names']['title'] = language.settings.garbage.garbage_use_names;
settingList['garbage']['garbage_use_names']['type'] = 'checkbox';

settingList['garbage']['garbage_use_cors_prefix'] = {};
settingList['garbage']['garbage_use_cors_prefix']['title'] = language.settings.garbage.garbage_use_cors_prefix;
settingList['garbage']['garbage_use_cors_prefix']['type'] = 'checkbox';
settingList['garbage']['garbage_use_cors_prefix']['help'] = language.settings.garbage.garbage_use_prefix_help;

settingList['about'] = {};
settingList['about']['title'] = language.settings.about.title;

settingList['about']['about_text'] = {};
settingList['about']['about_text']['title'] = 'Dashticz ' + dashticz_version + ' ' + dashticz_branch + ' by Rob Geerts<br>' + newVersion;

settingList['about']['about_text2'] = {};
settingList['about']['about_text2']['title'] = 'Years after developing the old and original Dashticz, I decided to start over.<br><br>For more help visit: <a href="http://www.domoticz.com/wiki/Dashticz_V2" target="_blank">http://www.domoticz.com/wiki/Dashticz_V2</a><br>You can also check out our helpful <a href="https://www.domoticz.com/forum/viewforum.php?f=67" target="_blank">community</a> in Dashticz topic on the Domoticz forum.';

settingList['about']['about_text3'] = {};
settingList['about']['about_text3']['title'] = 'Do you appreciate my work and want to buy me a beer? You can send me Bitcoins (17Qy4bsLM9J238fCZt5kaRc2bD5S1Aw6og) or donate via PayPal: <a href="https://www.paypal.me/robgeerts" target="_blank">https://www.paypal.me/robgeerts</a>'

settingList['about']['about_text4'] = {};
settingList['about']['about_text4']['title'] = 'If you have any issues you can report them in our community thread <a href="https://www.domoticz.com/forum/viewtopic.php?f=67&t=17427" target="_blank">Bug report</a>.'

var settings = {};
doneSettings = false;
if (typeof(Storage) !== "undefined") {
    $.each(localStorage, function (key, value) {
        if (key.substr(0, 9) == 'dashticz_') {
            settings[key.substr(9)] = value;
            doneSettings = true;
        }
    });
}

if (typeof(config) !== 'undefined') {
    settings = config;
}

if (typeof(settings['language']) === 'undefined') settings['language'] = 'en_US';
if (typeof(settings['speak_lang']) === 'undefined') settings['speak_lang'] = 'en-US';
if (typeof(settings['timeformat']) === 'undefined') settings['timeformat'] = 'DD-MM-YY HH:mm';
if (typeof(settings['calendarformat']) === 'undefined') settings['calendarformat'] = 'dd DD.MM HH:mm';
if (typeof(settings['shortdate']) === 'undefined') settings['shortdate'] = 'D MMM';
if (typeof(settings['longdate']) === 'undefined') settings['longdate'] = 'D MMMM YYYY';
if (typeof(settings['shorttime']) === 'undefined') settings['shorttime'] = 'HH:mm';
if (typeof(settings['longtime']) === 'undefined') settings['longtime'] = 'HH:mm:ss';
if (typeof(settings['weekday']) === 'undefined') settings['weekday'] = 'dddd';
if (typeof(settings['calendarlanguage']) === 'undefined') settings['calendarlanguage'] = 'en_US';
if (typeof(settings['domoticz_ip']) === 'undefined') settings['domoticz_ip'] = 'http://192.168.1.10:1407';
if (typeof(settings['user_name']) === 'undefined') settings['user_name'] = '';
if (typeof(settings['pass_word']) === 'undefined') settings['pass_word'] = '';
if (typeof(settings['app_title']) === 'undefined') settings['app_title'] = 'Dashticz';
if (typeof(settings['domoticz_refresh']) === 'undefined') settings['domoticz_refresh'] = 5;
if (typeof(settings['dashticz_refresh']) === 'undefined') settings['dashticz_refresh'] = 60;
if (typeof(settings['wu_api']) === 'undefined') settings['wu_api'] = '';
if (typeof(settings['wu_country']) === 'undefined') settings['wu_country'] = 'NL';
if (typeof(settings['wu_city']) === 'undefined') settings['wu_city'] = 'Amsterdam';
if (typeof(settings['boss_stationclock']) === 'undefined') settings['boss_stationclock'] = 'RedBoss';
if (typeof(settings['use_fahrenheit']) === 'undefined') settings['use_fahrenheit'] = 0;
if (typeof(settings['use_beaufort']) === 'undefined') settings['use_beaufort'] = 0;
if (typeof(settings['hide_topbar']) === 'undefined') settings['hide_topbar'] = 0;
if (typeof(settings['slide_effect']) === 'undefined') settings['slide_effect'] = 'slide';
if (typeof(settings['hide_mediaplayer']) === 'undefined') settings['hide_mediaplayer'] = 0;
if (typeof(settings['auto_swipe_back_to']) === 'undefined') settings['auto_swipe_back_to'] = 1;
if (typeof(settings['auto_positioning']) === 'undefined') settings['auto_positioning'] = 1;
if (typeof(settings['use_favorites']) === 'undefined') settings['use_favorites'] = 1;
if (typeof(settings['translate_windspeed']) === 'undefined') settings['translate_windspeed'] = 1;
if (typeof(settings['static_weathericons']) === 'undefined') settings['static_weathericons'] = 0;
if (typeof(settings['last_update']) === 'undefined') settings['last_update'] = 1;
if (typeof(settings['auto_swipe_back_after']) === 'undefined') settings['auto_swipe_back_after'] = 10;
if (typeof(settings['standby_after']) === 'undefined') settings['standby_after'] = 0;
if (typeof(settings['selector_instead_of_buttons']) === 'undefined') settings['selector_instead_of_buttons'] = 0;
if (typeof(settings['default_news_url']) === 'undefined') settings['default_news_url'] = 'http://www.nu.nl/rss/algemeen';
if (typeof(settings['news_scroll_after']) === 'undefined') settings['news_scroll_after'] = 7;
if (typeof(settings['standard_graph']) === 'undefined') settings['standard_graph'] = 'hours';
if (typeof(settings['edit_mode']) === 'undefined') settings['edit_mode'] = 0;
if (typeof(settings['units']) === 'undefined') {
    settings['units'] = {
        names: {
            kwh: 'kWh',
            watt: 'W',
            gas: 'm3',
            water: 'l',
            time: ''
        },
        decimals: {
            kwh: 2,
            watt: 2,
            gas: 1,
            water: 0,
            time: 0
        }
    };
}
if (typeof(settings['garbage']) === 'undefined') {
    settings['garbage'] = {
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
}
if (typeof(settings['garbage_mapping']) === 'undefined') {
    settings['garbage_mapping'] = {
        gft: ['gft', 'tuin', 'refuse bin', 'green', 'groen', 'Biodégradables', 'snoei'],
        pmd: ['plastic', 'pmd', 'verpakking', 'kunststof', 'valorlux'],
        rest: ['grof', 'grey', 'rest', 'grijs','grijze'],
        papier: ['papier', 'blauw', 'blue', 'recycling bin collection'],
        kca: ['chemisch', 'kca','kga'],
        brown: ['brown', 'verre'],
        black: ['black', 'zwart'],
        milieu: ['milieu'],
        kerstboom: ['kerst'],
    };
}
if (typeof(settings['garbage_use_names']) === 'undefined') settings['garbage_use_names'] = 0;
if (typeof(settings['garbage_use_colors']) === 'undefined') settings['garbage_use_colors'] = 0;
if (typeof(settings['garbage_icon_use_colors']) === 'undefined') settings['garbage_icon_use_colors'] = 1;
if (typeof(settings['garbage_use_cors_prefix']) === 'undefined') settings['garbage_use_cors_prefix'] = 1;
if (typeof(settings['lineColors']) === 'undefined') settings['lineColors'] = ['#eee', '#eee', '#eee'];
if (typeof(settings['room_plan']) === 'undefined') settings['room_plan'] = 0;
if (typeof(settings['garbage_use_cors_prefix']) === 'undefined') settings['garbage_use_cors_prefix'] = 1;
if (typeof(settings['theme']) === 'undefined') settings['theme'] = 'default';
if (typeof(settings['background_image']) === 'undefined') settings['background_image'] = 'img/bg2.jpg';
if (typeof(settings['loginEnabled']) === 'undefined') settings['loginEnabled'] = 0;

var _TEMP_SYMBOL = '°C';
if (settings['use_fahrenheit'] === 1) _TEMP_SYMBOL = '°F';

function loadSettings() {

    var html = '<div class="modal fade" id="settingspopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    html += '<div class="modal-dialog modal-dialog-settings">';
    html += '<div class="modal-content">';
    html += '<div class="modal-body"><br />';
    html += '<div class="row">';


    html += '<ul class="nav nav-pills">';
    var first = true;
    for (b in settingList) {
        var c = '';
        if (first) {
            c = ' class="active"';
            first = false;
        }
        html += '<li' + c + '><a data-toggle="pill" href="#tabs-' + b + '">' + settingList[b]['title'] + '</a></li>';
    }
    html += '</ul>';

    html += '<div class="tab-content"><br /><br />';

    var first = true;
    for (b in settingList) {
        var c = '';
        if (first) {
            c = ' active in';
            first = false;
        }
        html += '<div class="tab-pane fade' + c + '" id="tabs-' + b + '">';
        for (s in settingList[b]) {
            if (s !== 'title') {
                html += '<div class="row">';
                html += '<div class="col-xs-5" style="margin-bottom:1px;"><label style="margin-top: 6px;font-size: 12px;">' + settingList[b][s]['title'] + '</label>';
                if (typeof(settingList[b][s]['help']) !== 'undefined') html += '<span class="glyphicon" title="' + settingList[b][s]['help'] + '">&nbsp;&#xe086;</span>';
                html += '</div>';
                html += '<div class="col-xs-7" style="margin-bottom:1px;">';
                var val = '';
                if (typeof(settings[s]) !== 'undefined') val = settings[s];
                if (settingList[b][s]['type'] === 'text') html += '<div><input class="form-control" type="text" name="' + s + '" value="' + val + '" style="max-width:75%;" /></div>';
                if (settingList[b][s]['type'] === 'checkbox') {
                    var sel = '';
                    if (settings[s] == 1) sel = 'checked';
                    html += '<div class="material-switch pull-left"><input type="checkbox" id="' + s + '" name="' + s + '" value="1" ' + sel + ' style="margin-top:11px;" /><label for="' + s + '" class="label-success"></label></div>';
                }
                if (settingList[b][s]['type'] === 'select') {
                    html += '<select name="' + s + '" class="form-control" style="max-width:75%;padding-left: 8px;color: #555 !important;">';
                    html += '<option value=""></option>';
                    for (o in settingList[b][s]['options']) {
                        var sel = '';
                        if (settings[s] == o) sel = 'selected';
                        html += '<option value="' + o + '" ' + sel + '>' + settingList[b][s]['options'][o] + '</option>';
                    }
                    html += '</select>';
                }
                html += '</div>';
                html += '</div>';
            }
        }
        html += '</div>';
    }
    html += '</div>';
    html += '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">' + language.settings.close + '</button> ';
	if (settings['loginEnabled'] == true) html += '<button onClick="logout()" type="button" class="btn btn-primary" data-dismiss="modal">' + language.settings.general.logout + '</button> ';
	html += '<button onClick="saveSettings();" type="button" class="btn btn-primary" data-dismiss="modal">' + language.settings.save + '</button></div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    setTimeout(function () {
        $('body').append(html);

        if (typeof(settings['domoticz_ip']) === 'undefined') {
            if ($('.settingsicon').length == 0) $('body').prepend('<div data-id="settings" class="settings settingsicon col-xs-12 text-right" data-toggle="modal" data-target="#settingspopup"><em class="fa fa-cog" /><div>');
            $('.settingsicon').trigger('click');
        }
    }, 2000);
    $("#tabs").tabs();

}

function saveSettings() {

    var saveSettings = {};
    var alertSettings = "var config = {}\n";
    $('div#settingspopup input[type="text"],div#settingspopup select').each(function () {
        if (typeof(Storage) !== "undefined") localStorage.setItem('dashticz_' + $(this).attr('name'), $(this).val());
        if ($(this).val() == 1 || $(this).val() == 0) {
            val = parseFloat($(this).val());
            if (isNaN(val)) val = 0;
            alertSettings += "config['" + $(this).attr('name') + "'] = " + val + ";\n";
            saveSettings[$(this).attr('name')] = val;
        }

        else alertSettings += "config['" + $(this).attr('name') + "'] = '" + $(this).val() + "';\n";
        saveSettings[$(this).attr('name')] = $(this).val();
    });

    $('div#settingspopup input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            if (typeof(Storage) !== "undefined") localStorage.setItem('dashticz_' + $(this).attr('name'), $(this).val());
            alertSettings += "config['" + $(this).attr('name') + "'] = 1;\n";
            saveSettings[$(this).attr('name')] = 1;
        }
        else {
            if (typeof(Storage) !== "undefined") localStorage.setItem('dashticz_' + $(this).attr('name'), 0);
            alertSettings += "config['" + $(this).attr('name') + "'] = 0;\n";
            saveSettings[$(this).attr('name')] = 0;
        }

    });

    $.post('js/savesettings.php', saveSettings, function (data) {
        if (data !== '') {
            var html = '<div class="modal fade" id="settingsoutput" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
            html += '<div class="modal-dialog modal-dialog-settings">';
            html += '<div class="modal-content">';
            html += '<div class="modal-body" style="padding:20px;font-size:14px;"><br>';
            html += '<strong>' + language.settings.infosave + '</strong><br>If you like my work, you can buy me a beer at: <a href="https://www.paypal.me/robgeerts" target="_blank">https://www.paypal.me/robgeerts</a><br><br><textarea style="width:100%;height:500px;" id="codeToCopy">';

            html += alertSettings;

            html += '</textarea>';
            html += '</div><div class="modal-footer"><button onClick="document.location.href=document.location.href;" type="button" class="btn btn-primary" data-dismiss="modal">' + language.settings.close_reload + '</button></div>';
            html += '</div>';
            html += '</div>';
            html += '</div><div class="settingsoutput" data-toggle="modal" data-target="#settingsoutput"><em class="fa fa-cog" /><div>';

            $('body').append(html);
            setTimeout(function () {
                $('.settingsoutput').trigger('click');
            }, 1000);
        }
        else {
            document.location.href = document.location.href;
        }
    });
}
