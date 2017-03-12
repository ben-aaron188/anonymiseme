var Compromise = require('./compromise.js');

function Client() {
    throw new Error('Replacer is a static class!');
}

Client.replace_combined = function (string_input, type) {
    Compromise.ner_entities(string_input.replace('"', ''), type);
}

module.exports = Client;