var nlp = require('../libs/compromise/nlp_compromise.min.js');
var additional_male_names = require('../libs/lexicon/male.js');
var additional_female_names = require('../libs/lexicon/female.js');
var Replacer = null;

function Client() {
    throw new Error('Replacer is a static class!');
}

Client.replace_combined = function (string_input, complete) {
    _Replacer().string_replace_all(string_input.replace(/['"]+/g, ''), complete);
}

Client.preprocess_string = function (string) {
    var text_nlp = nlp.text(string);
    var input_text = text_nlp.text();
    var source_text = {
        raw: text_nlp.text(),
        normal: text_nlp.normal(),
        terms: text_nlp.terms(),
        nlp_persons_raw: nlp.text(input_text).people(),
        nlp_orgs_raw: nlp.text(input_text).organizations(),
        nlp_locations_raw: nlp.text(input_text).places(),
        nlp_values_raw: nlp.text(input_text).values(),
        nlp_dates_raw: nlp.text(input_text).dates()
    };

    source_text.terms = Client.customise_data(source_text.terms);

    return (source_text);
}

Client.customise_data = function (source) {

    for (var i = 0; i < source.length; i++) {
        var string = source[i].normal;

        if (Client.contains(additional_male_names, string)) {
            source[i].tag = "MalePerson";
            source[i].pos.Person = true;
            source[i].pos.MalePerson = true;
        } else if (Client.contains(additional_female_names, string)) {
            source[i].tag = "FemalePerson";
            source[i].pos.Person = true;
            source[i].pos.FemalePerson = true;
        }
    }

    return source;
}

Client.contains = function (source, text) {

    for (var i = 0; i < source.length; i++) {
        var current = source[i];

        if (text.toLowerCase() == current.toLowerCase()) {
            return true;
        }

    }

    return false;
}

function _Replacer() {
    if (!Replacer) {
        Replacer = require('./replacer.js');
    }

    return Replacer;
}

module.exports = Client;