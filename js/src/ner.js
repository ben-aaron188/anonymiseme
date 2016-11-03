var node_ner = require('node-ner');
var fs = require('fs');
var Replacer = null;
var Util = null;
var ner = new node_ner({
    install_path: './libs/node_ner/stanford-ner-2014-10-26'
});

function NER() {
    throw new Error('NER is a static class!');
}

/**
 * Extracts all entities from the text within the given text file.
 *
 * @param {String} file The name of the given file name
 */
NER.get_entities = function (file, complete) {
    ner.fromFile(file + ".txt", function (entities) {

        console.log(entities);
        NER.replace_entities(NER.as_set(entities), file, complete);
    });
}

/**
 * Converts the entity object to a set (math.).
 *
 * @param {Object} entities Found entities in given text
 * @returns {{ORGANIZATION: *, LOCATION: *}}
 */
NER.as_set = function (entities) {
    var locations = entities['LOCATION'];
    var organizations = entities['ORGANIZATION'];

    if (organizations && locations) {
        for (var i = 0; i < organizations.length; i++) {
            var index = locations.indexOf(organizations[i]);

            if (index > -1) {
                entities['ORGANIZATION'].splice(organizations.indexOf(organizations[i]), 1);
            }
        }
    }

    return {
        "ORGANIZATION": entities['ORGANIZATION'],
        "LOCATION": entities['LOCATION'],
        "PERSON": entities['PERSON'],
        "MONEY": entities['MONEY'],
        "DATE": entities['DATE'],
    };

}

/**
 * Checks whtether the given element is in the array.
 *
 * @param {String|Number} element The search element
 * @param {Array} array The given array
 * @returns {boolean}
 */
NER.in_array = function (element, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return true;
        }
    }

    return false;
}

/**
 * Checks whether the given string contains a special character and returns this character if true, false otherwise.
 *
 * @param {String} element The considered string
 * @returns {*}
 */
NER.get_extension = function (element) {
    var punctuation = ['[', '.', ',', '/', '#', '!', '$', '%', '&', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ']', '?'];

    for (var i = 0; i < punctuation.length; i++) {
        if (element.indexOf(punctuation[i]) > -1) {
            return punctuation[i];
        }
    }

    return false;
}

/**
 * Normalizes the given input.
 *
 * @param {String} stringinput The string to be adjusted
 * @returns {string}
 */
NER.adjust_term = function (stringinput) {
    var punctuation = ['[', '.', ',', '/', '#', '!', '$', '%', '&', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ']', '?'];
    var last_char = stringinput[stringinput.length - 1];

    if (NER.in_array(last_char, punctuation)) {
        return stringinput.substring(0, stringinput.length - 1).toLowerCase();
    } else {
        return stringinput.toLowerCase();
    }

}

/**
 * Replaces all the recognised entities within a given text.
 *
 * @param {String} entities The recognised entities
 */
NER.replace_entities = function (entities, file, complete) {
    var organizations = [],
        locations = [],
        persons = [],
        dates = [],
        entity_arr = [],
        replaced = [];

    fs.readFile(file + ".txt", 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        for (var property in entities) {
            if (entities[property]) {
                for (var i = 0; i < entities[property].length; i++) {
                    var entity = entities[property][i],
                        replacement = null;

                    if (property == 'MONEY') {
                        entity = NER.adjust_currency(entity);
                    }

                    if (complete) {
                        replacement = _Util().get_term_beginning(entity) + "XXX" + _Util().get_term_terminator(entity);
                    } else {
                        replacement = NER.get_replacement(property, entity, complete, replaced);
                        replaced.push(replacement);

                        if (property == 'ORGANIZATION') {
                            organizations.push(replacement);
                        } else if (property == 'LOCATION') {
                            locations.push(replacement);
                        } else if (property == 'PERSON') {

                            var res = _Replacer().smart_name_rep(data, entity, replacement);
                            data = res.data;

                            if (res.entities) {
                                for (var i = 0; i < res.entities.length; i++) {
                                    entity_arr.push(res.entities[i]);
                                }

                                persons.push(res.re_last);
                            }

                            persons.push(replacement);
                        } else if (property == "DATE") {
                            dates.push(replacement);
                        }
                    }

                    if (data.indexOf(entity) != -1) {
                        entity_arr.push(entity + " => " + replacement);
                    }

                    data = data.replace(new RegExp(entity, 'gi'), replacement);
                }
            }
        }

        NER.delete_file(file);
        var res = _Replacer().fine_tuning(data, organizations, locations, persons, dates, complete, replaced);
        var output = res.replaced;

        for (var i = 0; i < res.entities.length; i++) {
            entity_arr.push(res.entities[i]);
        }

        if (complete) {
            output = NER.replace_currencies(output);
        }

        console.log(output);
        console.log("");
        console.log(entity_arr);
    });
}

NER.get_replacement = function (property, entity, complete, replaced) {
    var replacement = _Replacer().ext_get_replacement(property, entity, complete);

    if (_Util().ident_inArray(replacement, replaced)) {
        return NER.get_replacement(property, entity, complete, replaced);
    } else {
        return replacement;
    }

}

NER.replace_currencies = function (data) {
    data = data.replace(/€/g, '');
    return data.replace(/\$/g, '');
}

NER.adjust_currency = function (currency) {
    return parseFloat(currency.replace(/[^\d\.]/g, '')).toString();
}

/**
 * Deletes the temp file.
 *
 * @param {String} filename Name of the file to be deleted.
 */
NER.delete_file = function (filename) {
    fs.unlinkSync(filename + ".txt");
}

/**
 * Writes the anonymised file to a new textfile and stores it in the current working directory.
 *
 * @param {String} anonymised The anonymised text
 */
NER.write_anon = function (anonymised) {
    fs.writeFile(file + "_anonymised.txt", anonymised, function (err) {
        if (err) {
            throw err;
        }
    });
}

_Replacer = function () {
    if (!Replacer) {
        Replacer = require('./replacer.js');
    }

    return Replacer;
};

function _Util() {
    if (!Util) {
        Util = require('./util.js');
    }

    return Util;
}

module.exports = NER;
