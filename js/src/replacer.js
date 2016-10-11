// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

var nlp = require('../libs/compromise/nlp_compromise.min.js');
var fs = require('fs');
var lexicon = nlp.lexicon();
var temp_replacers = [];
var replaced_arr = [];
var NER = null;
var Client = null;
var Util = null;
var Custom = null;

function Replacer() {
    throw new Error('Replacer is a static class!');
}

/**
 *
 * @param preprocessed_object
 * @returns {string}
 */
Replacer.string_replace_all = function (preprocessed_object) {
    var replaced = "";

    for (var i = 0; i < preprocessed_object.terms.length; i++) {
        var el = preprocessed_object.terms[i];

        if (el.pos.Date || el.pos.Value) {
            Replacer.generate_replacement(el, true);
            replaced += el.whitespace.preceding + _Util().get_term_beginning(el.text) + _Custom().check_date(el.text, el.replacement) + _Util().get_term_terminator(el.text) + el.whitespace.trailing;
            Replacer.add_to_temp(el.normal, el.replacement);
        } else {
            replaced += el.whitespace.preceding + el.text + el.whitespace.trailing;
        }
    }

    Replacer.ner_entities(replaced);
}

Replacer.fine_tuning = function (data, used_orgs, used_locations, used_persons) {
    var replaced = "";
    var prep = _Client().preprocess_string(data);

    for (var i = 0; i < prep.terms.length; i++) {
        var el = prep.terms[i];

        if (el.pos.Organization && !_Util().inArray(el.text, used_orgs)) {
            Replacer.generate_replacement(el, false);
            replaced += el.whitespace.preceding + _Util().get_term_beginning(el.text) + el.replacement + _Util().get_term_terminator(el.text) + el.whitespace.trailing;
            Replacer.add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Place && !_Util().inArray(el.text, used_locations)) {
            Replacer.generate_replacement(el, false);
            replaced += el.whitespace.preceding + _Util().get_term_beginning(el.text) + el.replacement + _Util().get_term_terminator(el.text) + el.whitespace.trailing;
            Replacer.add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Person && el.pos.Pronoun !== true && !_Util().inArray(el.text, used_persons)) {
            Replacer.generate_replacement(el, false);
            replaced += el.whitespace.preceding + _Util().get_term_beginning(el.text) + el.replacement + _Util().get_term_terminator(el.text) + el.whitespace.trailing;
            Replacer.add_to_temp(el.normal, el.replacement);
        } else {
            replaced += el.whitespace.preceding + el.text + el.whitespace.trailing;
        }
    }

    return replaced;
}

Replacer.generate_replacement = function (el, is_date) {
    if (is_date) {
        Replacer.define_replacement(el);
        el.replacement = _Custom().check_date(el.text, el.replacement);
    } else {
        Replacer.define_replacement(el);
        if (el.replacement.toLowerCase() == el.text.toLowerCase()) {
            Replacer.generate_replacement(el, is_date);
        }
    }
}

Replacer.ext_get_replacement = function (entity, string) {
    var term = nlp.text(string).sentences[0].terms[0],
        replacement,
        category,
        full_name = false,
        length = string.split(" ").length;

    if (entity != "DATE") {
        if (entity == "LOCATION") {
            category = "Country";
            var is_city = term.pos.City;

            if (is_city == true) {
                category = "City";
            }

        } else if (entity == "PERSON") {
            full_name = length > 1;

            if (term.pos.FemalePerson == true) {
                category = "FemalePerson";
            } else {
                category = "MalePerson";
            }
        } else {
            if (!term.pos.Person) {
                category = "Organization";
            } else {
                return string;
            }

        }

        if (_Util().term_is_capitalised(string)) {
            replacement = _Util().capitalise_string(Replacer.get_replacement(category, 'capitalise', full_name, length));
        } else if (term.is_acronym()) {
            replacement = Replacer.get_replacement(category, 'acronym');
        } else {
            replacement = Replacer.get_replacement(category, 'none');
        }

        return replacement;
    } else {
        return string;
    }

}

Replacer.get_replacement = function (category, special_spelling, full_name, length) {
    var alt_array = [];
    var replacer;
    var replacement;

    for (var key in lexicon) {
        var value = lexicon[key];

        if (value == category) {
            alt_array.push(key);
        }
    }

    if (full_name) {
        replacement = _Util().shuffle(alt_array)[0];
        var last = replacement;

        for (var i = 1; i < length; i++) {
            var next_name = _Util().shuffle(alt_array)[0];

            while (last == next_name) {
                next_name = _Util().shuffle(alt_array)[0];
            }

            last = next_name;
            replacement += (" " + next_name);
        }

    } else {
        replacement = _Util().shuffle(alt_array)[0];
    }

    if (special_spelling == 'capitalise') {
        replacer = _Util().capitalise_string(replacement);
    } else if (special_spelling == 'acronym') {
        replacer = replacement.toUpperCase();
    } else if (special_spelling == 'none') {
        replacer = replacement;
    }
    return replacer;
}

Replacer.define_replacement = function (term_object) {
    var category = term_object.tag;
    var length = term_object.text.split(" ").length;
    var full_name = term_object.text.split(" ").length >= 2;

    if (full_name) {
        var first = term_object.text.substring(0, term_object.text.indexOf(" "));

        category = nlp.text(first).sentences[0].terms[0].tag;
    }

    if (_Util().ident_inArray(term_object.normal, replaced_arr) == false) {
        if (_Util().term_is_capitalised(term_object.text)) {
            term_object.replacement = Replacer.get_replacement(category, 'capitalise', full_name, length);
        } else if (term_object.is_acronym()) {
            term_object.replacement = Replacer.get_replacement(category, 'acronym', full_name, length);
        } else {
            term_object.replacement = Replacer.get_replacement(category, 'none', full_name, length);
        }
    } else {
        var selected_from_object = temp_replacers.filter(function (x) {
            return x.original === term_object.normal;
        });

        term_object.replacement = selected_from_object[0].replacement;
    }
}

Replacer.add_to_temp = function (original, replacement) {
    var temp_obj = {
        original: original,
        replacement: replacement
    };
    temp_replacers.push(temp_obj);
    replaced_arr.push(temp_obj.original);
}

Replacer.ner_entities = function (stringinput) {
    var filename = new Date().getTime();

    fs.writeFile(filename + ".txt", stringinput, function () {
        _NER().get_entities(filename);
    });
}

function _Client() {
    if (!Client) {
        Client = require('./client.js');
    }

    return Client;
}

function _Util() {
    if (!Util) {
        Util = require('./util.js');
    }

    return Util;
}

function _Custom() {
    if (!Custom) {
        Custom = require('./custom.js');
    }

    return Custom;
}

function _NER() {
    if (!NER) {
        NER = require('./ner.js');
    }

    return NER;
}


module.exports = Replacer;