var request = require("request");

var _clientInfo;
var _searchString = "";

module.exports = function (clientInfo, searchString) {
    _clientInfo = clientInfo;
    _searchString = searchString.toLowerCase();
    request("https://api.coinmarketcap.com/v1/ticker/?limit=50", onResponse);
}

function onResponse(error, response, body) {
    if (!error) {
        try {
            var ticker = JSON.parse(body);
            var matchingCurrencies = ticker.filter(function(currency) {
                return currency.name.toLowerCase() == _searchString || currency.symbol.toLowerCase() == _searchString;
            });

            if (matchingCurrencies.length > 0) {
                var resultCurrency = matchingCurrencies[0];

                var message = "Price: $" + resultCurrency.price_usd
                  + " | Change: " + resultCurrency.percent_change_1h + "% (1h)"
                  + " / " + resultCurrency.percent_change_24h + "% (24h)"
                  + " / " + resultCurrency.percent_change_7d + "% (7d)";
                _clientInfo.client.say(_clientInfo.channel, message);
            }
        }
        catch (e) {
        }
    }
}
