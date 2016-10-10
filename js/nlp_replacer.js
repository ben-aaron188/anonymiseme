// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------
var temp_replacers = [];
var replaced_arr = [];
var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var nlp = require('./libs/compromise/nlp_compromise.min.js');
var lexicon = nlp.lexicon();
var NER = null;
var fs = require('fs');

function Replacer() {
    throw new Error('Replacer is a static class!');
}

/**
 *
 * @param preprocessed_object
 * @returns {string}
 */
Replacer.string_replace_all = function (preprocessed_object, type) {
    var replaced = "";
    var counts = [1, 1, 1, 1];

    for (var i = 0; i < preprocessed_object.terms.length; i++) {
        var el = preprocessed_object.terms[i];

        if (el.pos.Person && el.pos.Pronoun !== true && Replacer.term_is_capitalised(el.text)) {
            Replacer.generate_replacement(el, type, 0, counts);
            replaced += el.whitespace.preceding + Replacer.get_term_beginning(el.text) + el.replacement + Replacer.get_term_terminator(el.text) + el.whitespace.trailing;
            Replacer.add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Date || el.pos.Value) {
            Replacer.generate_replacement(el, type, 1, counts)
            replaced += el.whitespace.preceding + Replacer.get_term_beginning(el.text) + Replacer.check_date(el.text, el.replacement) + Replacer.get_term_terminator(el.text) + el.whitespace.trailing;
            Replacer.add_to_temp(el.normal, el.replacement);
        } else {
            replaced += el.whitespace.preceding + el.text + el.whitespace.trailing;
        }
    }

    Replacer.ner_entities(replaced);
}

Replacer.generate_replacement = function (el, type, entity, counts) {

    switch (type) {
        case 3:
            if (entity == 1) {
                Replacer.define_replacement(el, type, entity, counts);
                el.replacement = Replacer.check_date(el.text, el.replacement);
            } else {

                Replacer.define_replacement(el, type, entity, counts);
                if (el.replacement.toLowerCase() == el.text.toLowerCase()) {
                    Replacer.generate_replacement(el, type, entity, counts);
                }
            }

            break;
        default:
            Replacer.define_replacement(el, type, entity, counts);
            break;
    }

}

Replacer.ext_get_replacement = function (entity, string) {
    var term = nlp.text(string).sentences[0].terms[0],
        replacement,
        category;

    if (entity != "DATE") {
        if (entity == "LOCATION") {
            category = "Country";
            var is_city = term.pos.City;

            if (is_city == true) {
                category = "City";
            }

        } else {

            if (!term.pos.Person) {
                category = "Organization";
            } else {
                return string;
            }

        }

        if (Replacer.term_is_capitalised(string)) {
            replacement = Replacer.capitalise_string(Replacer.get_replacement(category, 'capitalise'));
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
        replacement = Replacer.shuffle(alt_array)[0];
        var last = replacement;

        for (var i = 1; i < length; i++) {
            var next_name = Replacer.shuffle(alt_array)[0];

            while (last == next_name) {
                next_name = Replacer.shuffle(alt_array)[0];
            }

            last = next_name;
            replacement += (" " + next_name);
        }

    } else {
        replacement = Replacer.shuffle(alt_array)[0];
    }

    if (special_spelling == 'capitalise') {
        replacer = Replacer.capitalise_string(replacement);
    } else if (special_spelling == 'acronym') {
        replacer = replacement.toUpperCase();
    } else if (special_spelling == 'none') {
        replacer = replacement;
    }
    return replacer;
}

Replacer.define_replacement = function (term_object, type, entity, counts) {
    var category = term_object.tag;
    var length = term_object.text.split(" ").length;

    if (type == 0) {
        term_object.replacement = "XXX";
    } else if (type == 1 || type == 2) {
        term_object.replacement = Replacer.replace_entity_dependent(type, entity, counts);
    } else {
        var full_name = term_object.text.split(" ").length >= 2;

        if (full_name) {
            var first = term_object.text.substring(0, term_object.text.indexOf(" "));

            category = nlp.text(first).sentences[0].terms[0].tag;
        }

        if (Replacer.ident_inArray(term_object.normal, replaced_arr) == false) {

            if (Replacer.term_is_capitalised(term_object.text)) {
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

}

Replacer.inArray = function (element, array) {

    for (var i = 0; i < array.length; i++) {
        if (element == array[i] || element.includes(array[i])) {
            return true;
        }
    }

    return false;
}

Replacer.ident_inArray = function (element, array) {

    for (var i = 0; i < array.length; i++) {
        if (element == array[i]) {
            return true;
        }
    }

    return false;
}

Replacer.replace_entity_dependent = function (type, entity, counts) {
    var replacement;

    if (type == 1) {

        switch (entity) {
            case 0:
                replacement = "VVV";
                break;
            case 1:
                replacement = "XXX";
                break;
            case 2:
                replacement = "YYY";
                break;
            case 3:
                replacement = "ZZZ";
                break;

        }
    } else {

        switch (entity) {
            case 0:
                replacement = "Person" + counts[0];
                counts[0]++;
                break;
            case 1:
                replacement = "Date" + counts[1];
                counts[1]++;
                break;
            case 2:
                replacement = "Organisation" + counts[2];
                counts[2]++;
                break;
            case 3:
                replacement = "Location" + counts[3];
                counts[3]++;
                break;
        }

    }

    return replacement;
}

Replacer.capitalise_string = function (stringinput) {
    var string_old = stringinput;
    var new_string = "";
    var names = stringinput.split(" ");

    if (names.length > 1) {

        for (var i = 0; i < names.length; i++) {
            new_string += names[i][0].toUpperCase() + names[i].slice(1).toLowerCase() + " ";
        }

        new_string = new_string.substring(0, new_string.length - 1);
    } else {
        new_string = string_old[0].toUpperCase() + string_old.slice(1).toLowerCase();
    }

    return new_string;
}

Replacer.term_is_capitalised = function (stringinput) {
    if (stringinput[0] == stringinput[0].toUpperCase()) {
        return true;
    } else {
        return false;
    }
}

Replacer.get_term_beginning = function (stringinput) {
    var punctuation = ['[', '.', ',', '/', '#', '!', '$', '%', '&', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ']'];
    var first_char = stringinput[0];
    var terminator;
    if (Replacer.inArray(first_char, punctuation) == true) {
        terminator = first_char;
    } else {
        terminator = '';
    }

    return terminator;
}

Replacer.get_term_terminator = function (stringinput) {
    var punctuation = ['[', '.', ',', '/', '#', '!', '$', '%', '&', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ']'];
    var last_char = stringinput[stringinput.length - 1];
    var terminator;
    if (Replacer.inArray(last_char, punctuation) == true) {
        terminator = last_char;
    } else {
        terminator = '';
    }

    return terminator;
}

Replacer.remove_term_terminator = function (stringinput) {
    var punctuation = ['[', '.', ',', '/', '#', '!', '$', '%', '&', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ']'];
    var last_char = stringinput[stringinput.length - 1];
    var first_char = stringinput[0];

    if (Replacer.inArray(last_char, punctuation) == true) {
        stringinput = stringinput.substring(0, stringinput.length - 1);
    }

    if (Replacer.inArray(first_char, punctuation) == true) {
        stringinput = stringinput.substring(1);
    }

    return stringinput;
}

Replacer.add_to_temp = function (original, replacement) {
    var temp_obj = {
        original: original,
        replacement: replacement
    };
    temp_replacers.push(temp_obj);
    replaced_arr.push(temp_obj.original);
}

Replacer.check_date = function (date, replacement) {
    date = Replacer.remove_term_terminator(date);

    if (Replacer.not_replacable(date)) {
        return date;
    } else if (Replacer.is_numeric_date(date)) {
        return Replacer.return_numeric_date(date);
    } else if (Replacer.is_numeric(date)) {
        return Replacer.create_numeric(date);
    } else if (Replacer.is_weekday_abbrev(date)) {
        return Replacer.return_weekday_abbrev(date);
    } else if (Replacer.has_numeric(date)) {
        return Replacer.return_numeric(date);
    } else if (Replacer.is_weekday(date)) {

        return Replacer.return_weekday(date);
    } else if (Replacer.is_ordinal(date)) {
        return Replacer.return_ordinal(date);
    } else if (Replacer.is_unit(date)) {
        return Replacer.return_unit(date);
    }

    return replacement;
}

Replacer.is_unit = function (date) {
    var units = ["km", "mi", "metres", "miles", "kilometres", "seconds"],
        unit;

    for (var i = 0; i < units.length; i++) {
        if (date.indexOf(units[i]) != -1) {
            unit = date.indexOf(units[i]);

            if (!isNaN(date.substring(0, unit)) && (units[i].length + date.substring(0, unit).length) == date.length) {
                return true;
            }
        }
    }

    return false;
}

Replacer.return_unit = function (date) {
    var units = ["km", "mi", "metres", "miles", "kilometres", "seconds"],
        unit,
        unit_idx;

    for (var i = 0; i < units.length; i++) {
        if (date.indexOf(units[i]) != -1) {
            unit_idx = date.indexOf(units[i]);
            unit = units[i];

            break;
        }
    }

    return Replacer.return_numeric(date.substring(0, unit_idx)) + unit;
}

Replacer.is_weekday_abbrev = function (date) {
    var abbrev = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    for (var i = 0; i < abbrev.length; i++) {
        if (date.toLowerCase() == abbrev[i]) {
            return true;
        }
    }

    return false;
}

Replacer.return_weekday_abbrev = function (date) {
    var abbrev = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    var index = Math.floor(Math.random() * abbrev.length);
    var new_abbrev = abbrev[index];

    if (date.toLowerCase() == new_abbrev) {
        return Replacer.return_weekday_abbrev(date);
    } else {
        if (date.toLowerCase() != date) {
            var first = new_abbrev.substring(0, 1).toUpperCase();
            new_abbrev = first + new_abbrev.substring(1);
        }

        return new_abbrev;
    }


}


Replacer.not_replacable = function (date) {
    var irreplacables = ["First", "first", "One", "one", "hour", "hours", "minutes", "seconds", "millisceconds", "weeks", "days", "months", "night", "now", "this month"];

    if (Replacer.inArray(date, irreplacables) == true) {
        return true;
    } else {
        return false;
    }
}

Replacer.is_numeric = function (date) {
    return date.split(" ").length == 1 && !isNaN(nlp.value(date).number) && nlp.value(date).number != "" && !Replacer.is_weekday(date) && !Replacer.is_ordinal(date);
}

Replacer.create_numeric = function (date) {
    var number = nlp.value(date).number;

    if (number == 1) {
        return date;
    } else {
        return Replacer.get_numeric(number, 2);
    }
}

Replacer.has_numeric = function (date) {
    var split = date.split(" ");

    for (var i = 0; i < split.length; i++) {

        if (!isNaN(split[i]) || (!isNaN(nlp.value(split[i]).number) && nlp.value(split[i]).number != "")) {
            return true;
        }

    }

    return false;
}

Replacer.return_numeric = function (date) {
    var split = date.split(" ");

    for (var i = 0; i < split.length; i++) {
        var current = split[i];

        if (!isNaN(parseInt(current)) || (!isNaN(nlp.value(current).number) && nlp.value(current).number != "")) {
            var origin = split[i];
            var replaced = Replacer.get_numeric(nlp.value(current).number, 1);
            split[i] = replaced;

            if (split.length > 1 && i < split.length - 1) {
                var next = split[i + 1];

                if (replaced == 1) {
                    if (isNaN(parseInt(split[i + 1]))) {

                        if (next.substring(next.length - 1) == "s") {
                            if (next.substring(next.length - 3) == "ies") {
                                split[i + 1] = next.substring(0, next.length - 3) + "y";
                            } else {
                                split[i + 1] = next.substring(0, next.length - 1);
                            }
                        }
                    }
                } else if (parseInt(origin) == 1 || nlp.value(current).number == 1) {
                    split[i + 1] = nlp.noun(next).pluralize();
                }
            }
        }
    }

    return split.join().replace(/,/g, " ");
}

Replacer.get_numeric = function (number, pl) {
    var numeric;

    if (number < 10) {
        numeric = Math.floor(Math.random() * 10) + pl;
    } else if (number < 100) {
        numeric = Math.floor(Math.random() * 100) + 1;
    } else if (number < 500) {
        numeric = Math.floor(Math.random() * 500) + 1;
    } else if (number < 1000) {
        numeric = Math.floor(Math.random() * 1000) + 1;
    } else {
        if (number < 2100) {
            if (number > parseInt(new Date().getFullYear())) {
                numeric = number + Math.floor(Math.random() * 10) + 1;
            } else {
                numeric = number - Math.floor(Math.random() * 5) + 1;
            }
        } else {
            numeric = Math.floor(Math.random() * 10000) + 1;
        }
    }

    if (numeric == number) {
        return Replacer.get_numeric(number, pl);
    } else {
        return numeric;
    }

}

Replacer.is_weekday = function (date) {

    for (var i = 0; i < weekdays.length; i++) {
        if (weekdays[i].toLowerCase() == date.toLowerCase() || (weekdays[i].toLowerCase() == date.substring(0, date.length - 1).toLowerCase() && date.substring(date.length - 1) == "s")) {
            return true;
        }
    }

    return false;
}

Replacer.return_weekday = function (date) {
    var weekday = weekdays[Math.floor(Math.random() * weekdays.length)];

    if (weekday.toLowerCase() == date.toLowerCase()) {
        return Replacer.return_weekday(date);
    } else if (date.substring(date.length - 1) == "s") {
        return weekday + "s";
    } else {
        return weekday;
    }
}

Replacer.is_numeric_date = function (date) {

    if (date.length < 8 || Replacer.not_valid(date)) {
        return false;
    } else {
        try {
            Date.parse(date);
        } catch (e) {
            return false;
        }

        return true;
    }

}

Replacer.get_month = function () {
    var random = Math.floor(Math.random() * months.length - 1) + 1;

    return months[random];
}

Replacer.return_numeric_date = function (date) {
    var separator = Replacer.get_separator(date);
    var new_date;

    if (separator == "none") {
        new_date = Replacer.get_month() + " " + Replacer.get_number(30) + " " + Replacer.get_year(date, separator);
    } else if (separator == ".") {
        new_date = "" + Replacer.get_number(30) + separator + Replacer.get_number(12) + separator + Replacer.get_year(date, separator);
    } else {
        new_date = "" + Replacer.get_number(12) + separator + Replacer.get_number(30) + separator + Replacer.get_year(date, separator);
    }

    if (new_date == date) {
        return Replacer.return_numeric_date(date);
    } else {
        return new_date;
    }
}

Replacer.get_number = function (limit) {
    var number = Math.floor(Math.random() * limit) + 1;

    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }

}

Replacer.get_year = function (date, separator) {
    var present = new Date();
    var year;

    if (separator == "none") {
        year = date.substring(date.length - 4);
    } else {
        year = date.substring(date.lastIndexOf(separator) + 1, date.length);
    }

    var diff = new Date(date).getTime() - present.getTime();

    if (diff < 0) {
        return parseInt(year) + Math.floor(Math.random() * (parseInt(year) - parseInt(present.getFullYear()))) + 1;
    } else {
        return parseInt(year) - Math.floor(Math.random() * (parseInt(year) - parseInt(present.getFullYear()))) + 1;
    }
}

Replacer.not_valid = function (date) {
    var count = 0;

    if (isNaN(date.substring(date.length - 4))) {
        return true;
    }

    if (date.includes("/")) {
        count++;
    }
    if (date.includes(".")) {
        count++;
    }
    if (date.includes("-")) {
        count++;
    }
    if (Replacer.includesWeekDay(date)) {
        count++;
    }

    return count != 1;
}

Replacer.includesWeekDay = function (date) {

    for (var i = 0; i < months.length; i++) {
        if (date.includes(months[i])) {
            return true;
        }
    }

    return false;
}

Replacer.get_separator = function (string) {
    if (string.includes("/")) {
        return "/";
    } else if (string.includes(".")) {
        return ".";
    } else if (string.includes("-")) {
        return "-";
    } else {
        return "none";
    }
}

Replacer.is_ordinal = function (string) {
    var number = string.substring(string.length - 3, string.length - 2);
    var value = null,
        value_comp;

    if (isNaN(string) && !isNaN(string.substring(0, string.length - 2))) {
        value = parseInt(number);
        value_comp = parseInt(string.substring(0, string.length - 2));
    } else if (!isNaN(nlp.value(string).number)) {
        value_comp = nlp.value(string).number;
        value = value_comp % 10;
    }

    if (value != null) {

        if ((value_comp == 11 || value_comp == 12 || value_comp == 13) && string.substring(string.length - 2) == "th") {
            return true;
        }

        if (
            (value == 1 && string.substring(string.length - 2) == "st") ||
            (value == 2 && string.substring(string.length - 2) == "nd") ||
            (value == 3 && string.substring(string.length - 2) == "rd") ||
            ((value == 0 || value > 3) && string.substring(string.length - 2) == "th")
        ) {
            return true;
        }
    }

    return false;
}

Replacer.return_ordinal = function (string) {
    var value = string.substring(0, string.length - 2);
    var ordinal;

    if (isNaN(value)) {
        value = nlp.value(string).number;
    }

    ordinal = Replacer.get_numeric(value, 1);

    switch (ordinal % 10) {
        case 1:
            ordinal += "st";
            break;
        case 2:
            ordinal += "nd";
            break;
        case 3:
            ordinal += "rd";
            break;
        default:
            ordinal += "th";
            break;
    }

    if (parseInt(ordinal.substring(0, ordinal.length - 2)) == value) {
        return Replacer.return_ordinal(string);
    } else {
        if (ordinal == "11st") {
            return "11th";
        } else if (ordinal == "12nd") {
            return "12th";
        } else if (ordinal == "13rd") {
            return "13th";
        } else {
            return ordinal;
        }
    }
}

Replacer.shuffle = function (array) {
    var newarr = [];
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        newarr[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return newarr;
}

Replacer.ner_entities = function (stringinput) {
    var filename = new Date().getTime();

    fs.writeFile(filename + ".txt", stringinput, function () {
        _NER().get_entities(filename);
    });
}


function _NER() {
    if (!NER) {
        NER = require('./node_ner.js');
    }

    return NER;
}

module.exports = Replacer;
