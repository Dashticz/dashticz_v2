var coinsvalue = [];

function getCoin(coin) {
    if (coin['source'] == 'litebit') {
        appendLiteBit(coin);
    } else {
        appendCoinMarketCap(coin);
    }
    setTimeout(function () {
        getCoin(coin);
    }, 15000);
}

function appendLiteBit(coin) {
    $.getJSON('https://cors-anywhere.herokuapp.com/https://www.litebit.eu/system/live-updates', function (data) {

        var symbol = '€';
        var varname = coin['key'] + 'RateBuyRound';

        if (typeof(coin['amount']) !== 'undefined' && parseFloat(coin['amount']) > 0) {
            var html = '<div class="col-xs-6 col-data">' + coin['key'].toUpperCase() + '<br /><strong class="title">' + symbol + number_format(data[varname], 2) + '</strong><br>';
            html += '<span class="state">' + coin['amount'] + '</span>';
            html += '</div>';
            html += '<div class="col-xs-6 col-data col-currency">' + symbol + number_format(data[coin['key'] + 'RateSellRound'] * coin['amount'], 2) + '</div>';
        } else {
            var html = '<div class="col-xs-12 col-data">' + coin['key'].toUpperCase() + '<br /><strong class="title">' + symbol + number_format(data[varname], 2) + '</strong><br>';
            html += '</div>';
        }

        coinsvalue[coin['key']] = data[varname];
        $('.coins-' + coin['key']).html(html);
    });
}

function appendCoinMarketCap(coin) {
    $.getJSON('https://api.coinmarketcap.com/v1/ticker/' + coin['key'] + '/?convert=' + coin['currency'], function (data) {
        var symbol = '$';
        var varname = 'price_usd';
        switch (coin['currency']) {
            case 'EUR':
                symbol = '€';
                varname = 'price_eur';
                break;
            case 'GBP':
                symbol = '£';
                varname = 'price_gbp';
                break;
        }

        if (typeof(coin['amount']) !== 'undefined' && parseFloat(coin['amount']) > 0) {
            var html = '<div class="col-xs-6 col-data">' + data[0]['symbol'] + '<br /><strong class="title">' + symbol + number_format(data[0][varname], 2) + '</strong><br>';
            html += '<span class="state">' + coin['amount'] + '</span>';
            html += '</div>';
            html += '<div class="col-xs-6 col-data col-currency">' + symbol + number_format(data[0][varname] * coin['amount'], 2) + '</div>';
        } else {
            var html = '<div class="col-xs-12 col-data">' + data[0]['symbol'] + '<br /><strong class="title">' + symbol + number_format(data[0][varname], 2) + '</strong><br>';
            html += '</div>';
        }

        coinsvalue[coin['key']] = data[0][varname];
        $('.coins-' + data[0]['id']).html(html);
    });
}
