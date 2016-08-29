// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------
var temp_replacers = [];
var replaced_arr = [];
var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function replace1_all(preprocessed_object) {
    var replaced = "";
    $(preprocessed_object.terms).each(function (i, el) {
        if (el.pos.Person && el.pos.Pronoun !== true && term_is_capitalised(el.text)) {
            define_replacement(el);
            replaced += el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing;
            add_to_temp(el.normal, el.replacement);
            // } else if (el.pos.Value || el.pos.Currency) {
            //     define_replacement(el);
            //     replaced += el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing;
            //     add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Date || el.pos.Value) {
            define_replacement(el);
            replaced += el.whitespace.preceding + check_date(el.text, el.replacement) + get_term_terminator(el.text) + el.whitespace.trailing;
            add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Organization) {
            define_replacement(el);
            replaced += el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing;
            add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Place) {
            define_replacement(el);
            replaced += el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing;
            add_to_temp(el.normal, el.replacement);
        } else {
            replaced += el.whitespace.preceding + el.text + el.whitespace.trailing;
        }
    });
    return replaced;
}

function replace1_all_(preprocessed_object) {
    var span_wrap = [];
    $(preprocessed_object.terms).each(function (i, el) {
        // && (el.tag == 'MalePerson' || el.tag == 'FemalePerson')
        // capital as requirement for names
        if (el.pos.Person && el.pos.Pronoun !== true && term_is_capitalised(el.text)) {
            define_replacement(el);
            span_wrap.push('<span class="highlighted persons">' + el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing + '</span>');
            add_to_temp(el.normal, el.replacement);
            // } else if (el.pos.Value || el.pos.Currency) {
            //     define_replacement(el);
            //     span_wrap.push('<span class="highlighted values">' + el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing + '</span>');
            //     add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Date || el.pos.Value) {
            define_replacement(el);

            span_wrap.push('<span class="highlighted dates">' + el.whitespace.preceding + check_date(el.text, el.replacement) + get_term_terminator(el.text) + el.whitespace.trailing + '</span>');
            add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Organization) {
            define_replacement(el);
            span_wrap.push('<span class="highlighted organizations">' + el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing + '</span>');
            add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Place) {
            define_replacement(el);
            span_wrap.push('<span class="highlighted locations">' + el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing + '</span>');
            add_to_temp(el.normal, el.replacement);
        } else {
            span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
        }
    });
    $('#ex3').text('');
    $(span_wrap).each(function (i, el) {
        $('#ex3').append(el);
    });
}


function get_replacement(category, special_spelling) {
    var alt_array = [];
    var replacer;
    $.each(lexicon, function (key, value) {
        if (value == category) {
            alt_array.push(key);
        }
    });
    if (special_spelling == 'capitalise') {
        replacer = capitalise_string(shuffle(alt_array)[0]);
    } else if (special_spelling == 'acronym') {
        replacer = shuffle(alt_array)[0].toUpperCase();
    } else if (special_spelling == 'none') {
        replacer = shuffle(alt_array)[0];
    }
    return replacer;
}

function define_replacement(term_object, preprocessed_object) {
    if ($.inArray(term_object.normal, replaced_arr) < 0) {
        if (term_is_capitalised(term_object.text)) {
            term_object.replacement = get_replacement(term_object.tag, 'capitalise');
        } else if (term_object.is_acronym()) {
            term_object.replacement = get_replacement(term_object.tag, 'acronym');
        } else {
            term_object.replacement = get_replacement(term_object.tag, 'none');
        }
    } else {
        var selected_from_object = temp_replacers.filter(function (x) {
            return x.original === term_object.normal;
        });
        term_object.replacement = selected_from_object[0].replacement;
    }
}


function capitalise_string(stringinput) {
    var string_old = stringinput;
    var new_string = string_old[0].toUpperCase() + string_old.slice(1).toLowerCase();
    return new_string;
}

function term_is_capitalised(stringinput) {
    if (stringinput[0] == stringinput[0].toUpperCase()) {
        return true;
    } else {
        return false;
    }
}

function get_term_terminator(stringinput) {
    var punctuation = ['[', '.', ',', '/', '#', '!', '$', '%', '&', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ']'];
    var last_char = stringinput[stringinput.length - 1];
    var terminator;
    if ($.inArray(last_char, punctuation) > -1) {
        terminator = last_char;
    } else {
        terminator = '';
    }

    return terminator;
}

function remove_term_terminator(stringinput) {
    var punctuation = ['[', '.', ',', '/', '#', '!', '$', '%', '&', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ']'];
    var last_char = stringinput[stringinput.length - 1];

    if ($.inArray(last_char, punctuation) > -1) {
        return stringinput.substring(0, stringinput.length - 1);
    } else {
        return stringinput;
    }
}

function add_to_temp(original, replacement) {
    var temp_obj = {
        original: original,
        replacement: replacement
    };
    temp_replacers.push(temp_obj);
    replaced_arr.push(temp_obj.original);
}

function check_date(date, replacement) {

    date = remove_term_terminator(date);

    if (is_weekday(date)) {
        return return_weekday(date);
    } else if (is_numeric_date(date)) {
        return return_numeric_date(date);
    } else if (is_ordinal(date)) {
        return return_ordinal(date);
    }

    return replacement;
}

function is_weekday(date) {

    for (var i = 0; i < weekdays.length; i++) {
        if (weekdays[i] == date || (weekdays[i].toLowerCase()) == date) {
            return true;
        }
    }

    return false;
}

function return_weekday(date) {

    var weekday = weekdays[Math.floor(Math.random() * weekdays.length)];

    if (weekday == date || weekday.toLowerCase() == date) {
        return return_weekday(date);
    }

    return weekday;
}

function is_numeric_date(date) {

    if (date.length < 8 || not_valid(date)) {
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

function return_numeric_date(date) {
    var separator = get_separator(date);
    var new_date = "" + get_number(12) + separator + get_number(30) + separator + get_year(date, separator);

    if (new_date == date) {
        return return_numeric_date(date);
    } else {
        return new_date;
    }
}

function get_number(limit) {
    var number = Math.floor(Math.random() * limit) + 1;

    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }

}

function get_year(date, separator) {

    var present = new Date();
    var year = date.substring(date.lastIndexOf(separator) + 1, date.length);
    var diff = new Date(date).getTime() - present.getTime();

    if (diff < 0) {
        return parseInt(year) + Math.floor(Math.random() * (parseInt(year) - parseInt(present.getFullYear()))) + 1;
    } else {
        return parseInt(year) - Math.floor(Math.random() * (parseInt(year) - parseInt(present.getFullYear()))) + 1;
    }
}

function not_valid(date) {
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

    return count != 1;
}

function get_separator(string) {
    if (string.includes("/")) {
        return "/";
    } else if (string.includes(".")) {
        return ".";
    } else {
        return "-";
    }
}

function is_ordinal(string) {

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

function return_ordinal(string) {
    var value = string.substring(0, string.length - 2);
    var ordinal;

    if (isNaN(value)) {
        value = nlp.value(string).number;
    }

    if (value < 10) {
        ordinal = Math.floor(Math.random() * 10) + 1;
    } else if (value < 100) {
        ordinal = Math.floor(Math.random() * 100) + 1;
    } else if (value < 500) {
        ordinal = Math.floor(Math.random() * 500) + 1;
    } else if (value < 1000) {
        ordinal = Math.floor(Math.random() * 1000) + 1;
    } else {
        ordinal = Math.floor(Math.random() * 10000) + 1;
    }

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
        return return_ordinal(string);
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

