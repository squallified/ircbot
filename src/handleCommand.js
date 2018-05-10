var utils = require("./ircbot-utils");
var imdbSearch = require("./imdbSearch");
var youtubeSearch = require("./youtubeSearch");
var poeSearch = require("./poeSearch");
var googleSearch = require("./googleSearch");
var eightball = require("./eightball");
var stats = require("./stats");
var roll = require("./roll");
var seen = require("./seen");
var quote = require("./quote");
var timer = require("./timer");
var jokes = require("./jokes")
var cryptoCurrency = require("./cryptoCurrency");
var weather = require("./weather");
var _clientInfo = undefined;
var _options = undefined;

module.exports = function (clientInfo, message, options) {
    _clientInfo = clientInfo;
    _options = options;
    handleCommand(message);
};
function handleCommand(message) {
    var command = utils.extractCommand(message);
    var parameters = utils.extractParameters(message);
    var result = executeCommand(command, parameters);
    if (result)
        stats.registerCommand(_clientInfo, result, parameters);
    return result !== "";
}
function executeCommand(command, parameters) {
    switch (command) {
        case "help":
            _clientInfo.client.say(_clientInfo.channel, "https://github.com/PatrickSpemann/ircbot/tree/master/docs");
            return "help";
        case "stats":
            if (_options.statsResponse)
                _clientInfo.client.say(_clientInfo.channel, _options.statsResponse);
            return "stats";
        case "imdb":
            imdbSearch(_clientInfo, parameters);
            return "imdb";
        case "y":
        case "youtube":
            youtubeSearch(_clientInfo, parameters);
            return "youtube";
        case "p":
        case "poe":
            poeSearch(_clientInfo, parameters);
            return "poe";
        case "g":
        case "google":
            googleSearch(_clientInfo, false, parameters);
            return "google";
        case "i":
        case "img":
            googleSearch(_clientInfo, true, parameters);
            return "img";
        case "roll":
            roll(_clientInfo, parameters);
            return "roll";
        case "8ball":
            eightball(_clientInfo, parameters);
            return "8ball";
        case "seen":
            seen.get(_clientInfo, parameters);
            return "seen";
        case "top":
            stats.getTop(_clientInfo, parameters);
            return "top";
        case "quote":
            quote.getRandom(_clientInfo, parameters);
            return "quote";
        case "addquote":
            quote.add(_clientInfo, parameters);
            return "addquote";
        case "quotes":
            if (_options.quotesResponse)
                _clientInfo.client.say(_clientInfo.channel, _options.quotesResponse);
            return "quotes";
        case "uman":
            _clientInfo.client.say(_clientInfo.channel, "?");
            return "uman";
        case "timer":
            timer.add(_clientInfo, parameters);
            return "timer";
        case "joke":
            jokes.get(_clientInfo, parameters);
            return "joke"
        case "price":
        case "crypto":
            cryptoCurrency(_clientInfo, parameters);
            return "crypto";
        case "w":
        case "weather":
            weather(_clientInfo, parameters);
        default:
            return "";
    }
}