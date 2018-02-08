var utils = require("./ircbot-utils");
var imdbSearch = require("./imdbSearch");
var youtubeSearch = require("./youtubeSearch");
var poeSearch = require("./poeSearch");
var googleSearch = require("./googleSearch");
var eightball = require("./eightball");
var stats = require("./stats");
var roll = require("./roll");
var seen = require("./seen");
var _clientInfo = undefined;

module.exports = function (clientInfo, message) {
    _clientInfo = clientInfo;
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
        case "uman":
            _clientInfo.client.say(_clientInfo.channel, "?");
            return "uman";
        default:
            return "";
    }
}