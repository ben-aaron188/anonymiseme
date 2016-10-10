var node_ner = require('node-ner');
var fs = require('fs');
var Replacer = null;
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
NER.get_entities = function (file) {
    ner.fromFile(file + ".txt", function (entities) {
        NER.replace_entities(NER.as_set(entities), file);
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
NER.replace_entities = function (entities, file) {
    fs.readFile(file + ".txt", 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        for (var property in entities) {
            if (entities[property]) {
                for (var i = 0; i < entities[property].length; i++) {
                    var entity = entities[property][i];
                    var replacement = _Replacer().ext_get_replacement(property, entity);

                    data = data.replace(new RegExp(entity, 'g'), replacement);
                }
            }
        }

        console.log(data);
        NER.delete_file(file);
    });
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
        Replacer = require('./nlp_replacer.js');
    }

    return Replacer;
};

// // Running the Script
// if (!file || file.indexOf(".txt") != -1) {
//     throw new Error("Type in a correct filename (no .txt ending)!");
// } else {
//     NER.get_entities(file);
// }

module.exports = NER;
