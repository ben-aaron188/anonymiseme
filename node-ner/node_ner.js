/**
 * Usage:
 *
 * 1. Navigate to the directory where this file is stored in.
 * 2. Add the desired textfile to this directory (only .txt allowed).
 * 3. Run 'node node_ner.js name_of_textfile (!!without .txt-ending!!!)'
 *
 */

var node_ner = require('node-ner');
var fs = require('fs')
var file = process.argv[2];
var ner = new node_ner({
    install_path: 'stanford-ner-2014-10-26'
});

/**
 * Extracts all entities from the text within the given text file.
 *
 * @param {String} file The name of the given file name
 */
get_entities = function (file) {
    ner.fromFile(file + ".txt", function (entities) {
        replace_entities(entities);
    });
}

/**
 * Replaces all occurrences of a given substring with another given substring in the given string.
 *
 * @param {String} target The considered string
 * @param {String} search The substring to be replaced
 * @param {String} replacement The replacement
 * @returns {string} The modified string
 */
replace_all = function (target, search, replacement) {
    return target.split(search).join(replacement);
}

/**
 * Checks whtether the given element is in the array.
 *
 * @param {String|Number} element The search element
 * @param {Array} array The given array
 * @returns {boolean}
 */
in_array = function (element, array) {
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
get_extension = function (element) {
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
adjust_term = function (stringinput) {
    var punctuation = ['[', '.', ',', '/', '#', '!', '$', '%', '&', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ']', '?'];
    var last_char = stringinput[stringinput.length - 1];

    if (in_array(last_char, punctuation)) {
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
replace_entities = function (entities) {
    fs.readFile(file + ".txt", 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        var textinput = data.split(" ");

        for (var property in entities) {
            for (var i = 0; i < entities[property].length; i++) {
                for (var j = 0; j < textinput.length; j++) {
                    var extension = get_extension(textinput[j]);

                    if (adjust_term(textinput[j]) == entities[property][i].toLowerCase()) {
                        textinput[j] = "XXX";

                        if (extension) {
                            textinput[j] += extension;
                        }
                    }
                }
            }
        }

        write_anon(replace_all(textinput.join(), ",", " "));
    });
}

/**
 * Writes the anonymised file to a new textfile and stores it in the current working directory.
 *
 * @param {String} anonymised The anonymised text
 */
write_anon = function (anonymised) {
    fs.writeFile(file + "_anonymised.txt", anonymised, function (err) {
        if (err) {
            throw err;
        }
    });
}

// Running the Script
if (!file || file.indexOf(".txt") != -1) {
    throw new Error("Type in a correct filename (no .txt ending)!");
} else {
    get_entities(file);
}

