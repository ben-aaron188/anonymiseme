// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------
var temp_replacers = [];
var replaced_arr = [];

function replace1_all(preprocessed_object) {
    var replaced = "";
    $(preprocessed_object.terms).each(function(i, el) {
        if (el.pos.Person && el.pos.Pronoun !== true) {
            define_replacement(el);
            replaced += el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing;
            add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Value || el.pos.Currency) {
            define_replacement(el);
            replaced += el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing;
            add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Date) {
            define_replacement(el);
            replaced += el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing;
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
            replaced += el.whitespace.preceding + el.text + get_term_terminator(el.text) + el.whitespace.trailing;
        }
    });
    return replaced;
}

function replace1_all_(preprocessed_object) {
    var span_wrap = [];
    $(preprocessed_object.terms).each(function(i, el) {
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
        } else if (el.pos.Date) {
            define_replacement(el);
            span_wrap.push('<span class="highlighted dates">' + el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing + '</span>');
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
            span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + get_term_terminator(el.text) + el.whitespace.trailing + '</span>');
        }
    });
    $('#ex3').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex3').append(el);
    });
}


function get_replacement(category, special_spelling) {
    var alt_array = [];
    var replacer;
    $.each(lexicon, function(key, value) {
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
        var selected_from_object = temp_replacers.filter(function(x) {
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

function add_to_temp(original, replacement) {
    var temp_obj = {
        original: original,
        replacement: replacement
    };
    temp_replacers.push(temp_obj);
    replaced_arr.push(temp_obj.original);
}
