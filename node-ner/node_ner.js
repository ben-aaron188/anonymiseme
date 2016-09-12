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

var ner = new node_ner({
    install_path: 'stanford-ner-2014-10-26'
});

var file = process.argv[2];

if (!file || file.indexOf(".txt") != -1) {
    throw new Error("Type in a correct filename (no .txt ending)!");
}

get_entities = function (file) {
    ner.fromFile(file + ".txt", function (entities) {
        replace_entities(entities);
    });
}

replace_all = function (target, search, replacement) {
    return target.split(search).join(replacement);
}

in_array = function (element, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return true;
        }
    }

    return false;
}

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
 * @param {String} stringinput The text message
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

replace_entities = function (entities) {
    fs.readFile(file + ".txt", 'utf8', function (err, data) {
        if (err) throw err;
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

write_anon = function (anonymised) {
    fs.writeFile(file + "_anonymised.txt", anonymised, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}


get_entities(file);

