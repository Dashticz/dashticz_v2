

var coinsvalue = [];
function getCoin(coin){
	if(coin['source']=='litebit'){
		$.getJSON('https://cors-anywhere.herokuapp.com/https://www.litebit.eu/system/live-updates',function(data){

			var symbol='€';
			var varname=coin['key']+'RateBuyRound';
			var septhousands='.';
			var sepdecimal=',';

			if(typeof(coin['amount'])!=='undefined' && parseFloat(coin['amount'])>0){
				var html='<div class="col-xs-7 col-data">'+coin['key'].toUpperCase()+'<br /><strong class="title">'+symbol+number_format(data[varname],2,sepdecimal,septhousands)+'</strong><br>';
				html+='<span class="state">'+coin['amount']+'</span>';
				html+='</div>';
				html+='<div class="col-xs-5 col-data col-currency">'+symbol+number_format(data[coin['key']+'RateSellRound']*coin['amount'],2,sepdecimal,septhousands)+'</div>';
			}
			else {
				var html='<div class="col-xs-12 col-data">'+coin['key'].toUpperCase()+'<br /><strong class="title">'+symbol+number_format(data[varname],2,sepdecimal,septhousands)+'</strong><br>';
				html+='</div>';
			}

			coinsvalue[coin['key']] = data[varname];
			$('.coins-'+coin['key']).html(html);
		});
	}
	else {
		$.getJSON('https://api.coinmarketcap.com/v1/ticker/'+coin['key']+'/?convert='+coin['currency'],function(data){

			var symbol='$';
			var septhousands=',';
			var sepdecimal='.';
			if(coin['currency']=='EUR'){
				var symbol='€';
				var varname='price_eur';
				var septhousands='.';
				var sepdecimal=',';
			}
			else if(coin['currency']=='GBP'){
				var symbol='£';
				var varname='price_gbp';
			}

			if(typeof(coin['amount'])!=='undefined' && parseFloat(coin['amount'])>0){
				var html='<div class="col-xs-7 col-data">'+data[0]['symbol']+'<br /><strong class="title">'+symbol+number_format(data[0][varname],2,sepdecimal,septhousands)+'</strong><br>';
				html+='<span class="state">'+coin['amount']+'</span>';
				html+='</div>';
				html+='<div class="col-xs-5 col-data col-currency">'+symbol+number_format(data[0][varname]*coin['amount'],2,sepdecimal,septhousands)+'</div>';
			}
			else {
				var html='<div class="col-xs-12 col-data">'+data[0]['symbol']+'<br /><strong class="title">'+symbol+number_format(data[0][varname],2,sepdecimal,septhousands)+'</strong><br>';
				html+='</div>';
			}

			coinsvalue[coin['key']] = data[0][varname];
			$('.coins-'+data[0]['id']).html(html);
		});
	}
	setTimeout(function(){ getCoin(coin); },15000);
}