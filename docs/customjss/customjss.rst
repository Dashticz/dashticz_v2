Functionality via custom.jss
############################

There is the possibility to use your own functions in Dashticz V2.0
For this you can edit the file ``<dashticz v2 folder>/custom/custom.js``.

``function afterGetDevices()``
------------------------------

This predefined function will be called when the dashboard got all device information.

You can enter code inside this function which you want to be called.

Of course, you can also use stuff like $(document).ready() etc...

The following example shows how you can change the styling of a Domoticz device based on the status::

    function afterGetDevices(){
        if (alldevices[120].Data == 'Off') {
      		$('.block_120 .title').addClass('warningblue');
      		$('.block_120 .state').addClass('warningblue');
       	}
       	else {	 
      		$('.block_120 .title').removeClass('warningblue');
      		$('.block_120 .state').removeClass('warningblue');
       	}	
    }

In this example the CSS style 'warningblue' is applied to the title and state part of Domoticz block 120 if the state is 'Off' (as used by switches).
For this example to work you must also add the definition for ``warningblue`` to ``custom.css``. For instance as follows::

    .warningblue {
      color: blue !important;
    }




``function getExtendedBlockTypes(blocktypes)``
----------------------------------------------

Some blocktypes are filtered out by their distinct name and therefore will not produce the nice icons. Referring to ``blocktypes.Name = {}`` section in ``blocks.js``.
Add the following function to show the icons and data-layout for blocks with your own names.

::

    function getExtendedBlockTypes(blocktypes){
       blocktypes.Name['Maan op'] = { icon: 'fa-moon-o', title: '<Name>', value: '<Data>' }
       blocktypes.Name['Maan onder'] = { icon: 'fa-moon-o', title: '<Name>', value: '<Data>' }
       return blocktypes;
    }


``function getBlock_IDX(device,idx)``
--------------------------------------

Want your block to show up differently then Dashticz generates and do you have a little bit of coding skills?
Add to ``custom.js`` one of the examples::

    function getBlock_233(device,idx){ //change 233 to the idx of your device!
       $('.block_'+idx).attr('onclick','switchDevice(this)');
       var html='';
       html+='<div class="col-xs-4 col-icon">';
          if(device['Status']=='Off') html+=iconORimage(idx,'fas fa-toggle-off','','off icon');
          else html+=iconORimage(idx,'fas fa-toggle-on','','on icon');
       html+='</div>';
       html+='<div class="col-xs-8 col-data">';
       html+='<strong class="title">'+device['Name']+'</strong><br />';
       if(device['Status']=='Off') html+='<span class="state">AFWEZIG</span>';
       else html+='<span class="state">AANWEZIG</span>';

       if(showUpdateInformation(idx)) html+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(settings['timeformat'])+'</span>';
       html+='</div>';
       return html;
    }

    function getBlock_6(device,idx){ 
       $('.block_'+idx);
       var html='';
       html+='<div class="col-xs-4 col-icon">';
          if(device['Status']=='Off') html+='<img src="img/cust_away.png" class="off icon" />';
          else html+='<img src="img/cust_home.png" class="on icon" />';
       html+='</div>';
       html+='<div class="col-xs-8 col-data">';
       html+='<strong class="title">'+device['Name']+'</strong><br />';
       if(device['Status']=='Off') html+='<span class="state">AFWEZIG</span>';
       else html+='<span class="state">AANWEZIG</span>';

       if(showUpdateInformation(idx)){
              html+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(settings['timeformat'])+'</span>';
       }
       html+='</div>';
       return html;
    }


``function getStatus_IDX(idx,value,device)``
--------------------------------------------

Just like the function to take action on change of a value, now is extended functionality to do something with a block when it has a specific value.
Example, add a red background to a switch when energy usage reaches a limit.

First you'll have to find the correct IDX for the device. To find the correct IDX number, use http://domoticz_url:8080/json.htm?type=devices&filter=all&used=true , you get an overview of the devices, IDX and it's corresponding parameters.
After you have the correct IDX, you can add this device to the ``custom.js`` according to the following example::

    function getStatus_145(idx,value,device){
       if(parseFloat(device['Data'])>23){
          $('div.block_145').addClass('warning');
       }
       else {
          $('div.block_145').removeClass('warning');
       }
    }

    function getStatus_286(idx,value,device){
       if(parseFloat(device['Data'])>4){
          $('div.block_286').addClass('warningblue');
       }
       else {
          $('div.block_145').removeClass('warningblue');
       }
    }

And in ``custom.css`` add your css, according to this example::
 
    .warning {
       background: rgba(199,44,44,0.3) !important;
        background-clip: padding-box;
    }

    .warningblue {
       background: rgba(45,119,204,0.3) !important;
        background-clip: padding-box;
    }

Or if you like a blinking version::

    .warning {
       background: rgba(199,44,44,0.3) !important;
       background-clip: padding-box;
       border: 7px solid rgba(255,255,255,0);
       -webkit-animation: BLINK-ANIMATION 1s infinite;
       -moz-animation: BLINK-ANIMATION 1s infinite;
       -o-animation: BLINK-ANIMATION 1s infinite;
       animation: BLINK-ANIMATION 1s infinite;
    }

    @-webkit-keyframes BLINK-ANIMATION {
       0%, 49% {
          background-color: rgba(199,44,44,0.3);
          background-clip: padding-box;
          border: 7px solid rgba(255,255,255,0);
       }
       50%, 100% {
          background-color: rgba(199,44,44,0.7);
          background-clip: padding-box;
          border: 7px solid rgba(255,255,255,0);
       }
    }

    .warningblue {
       background: rgba(45,119,204,0.3) !important;
        background-clip: padding-box;
       border: 7px solid rgba(255,255,255,0);
       -webkit-animation: BLINK-ANIMATION-BLUE 1s infinite;
       -moz-animation: BLINK-ANIMATION-BLUE 1s infinite;
       -o-animation: BLINK-ANIMATION-BLUE 1s infinite;
       animation: BLINK-ANIMATION-BLUE 1s infinite;
    }

    @-webkit-keyframes BLINK-ANIMATION-BLUE {
       0%, 49% {
          background-color: rgba(45,119,204,0.3);
          background-clip: padding-box;
          border: 7px solid rgba(255,255,255,0);
       }
       50%, 100% {
          background-color: rgba(45,119,204,0.7);
          background-clip: padding-box;
          border: 7px solid rgba(255,255,255,0);
       }
    }


``function getStatus_IDX(idx,value,device)`` triggered by UpdateStatus
----------------------------------------------------------------------

Based on the command ``unix()-(3600*2)`` where 3600*2 = 2 hours it will check the LastUpdate status and add/remove the corresponding class::

    function getStatus_153(idx,value,device){
    	setTimeout(function(){
    		if(moment(device['LastUpdate']).unix()<(moment().unix()-(3600*2))){
    			$('div.block_153 span.lastupdate').addClass('lu_warningred');
    		}
    		else {
    			$('div.block_153 span.lastupdate').removeClass('lu_warningred');
    		}
    	},1000);
    }

More about other json commands, you can find in the Domoticz wiki: https://www.domoticz.com/wiki/Domoticz_API/JSON_URL%27s#Get_all_devices_of_a_certain_type

``function getChange_IDX(idx,value,device)``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This function gets called when the value of a Domoticz device changes.
