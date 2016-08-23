// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------
var temp_replacers = [];
var replaced_arr = [];

function replace1_single(preprocessed_object, entity) {
    var span_wrap = [];
    var preprocessed_object2 = set_replacers(preprocessed_object);
    switch (entity) {
        case 'persons':
            $(preprocessed_object2.terms).each(function(i, el) {
                if (el.pos.Person) {
                    span_wrap.push('<span class="highlighted persons">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
        case 'locations':
            $(preprocessed_object.terms).each(function(i, el) {
                if (el.pos.Place) {
                    span_wrap.push('<span class="highlighted locations">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
        case 'organizations':
            $(preprocessed_object.terms).each(function(i, el) {
                if (el.pos.Organization) {
                    span_wrap.push('<span class="highlighted organizations">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
        case 'dates':
            $(preprocessed_object.terms).each(function(i, el) {
                if (el.pos.Date) {
                    span_wrap.push('<span class="highlighted dates">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
        case 'values':
            $(preprocessed_object.terms).each(function(i, el) {
                if (el.pos.Value || el.pos.Currency) {
                    span_wrap.push('<span class="highlighted values">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
    }
    $('#ex3').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex3').append(el);
        // change to replacer
    });
}

// repetitions
function replace1_all(preprocessed_object) {
    var span_wrap = [];
    // var preprocessed_object2 = set_replacers(preprocessed_object);
    $(preprocessed_object.terms).each(function(i, el) {
        if (el.pos.Person && el.pos.Pronoun !== true) {
            define_replacement(el);
            span_wrap.push('<span class="highlighted persons">' + el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing + '</span>');
            add_to_temp(el.normal, el.replacement);
        } else if (el.pos.Value || el.pos.Currency) {
            define_replacement(el);
            span_wrap.push('<span class="highlighted values">' + el.whitespace.preceding + el.replacement + get_term_terminator(el.text) + el.whitespace.trailing + '</span>');
            add_to_temp(el.normal, el.replacement);
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
    if($.inArray(term_object.normal, replaced_arr) < 0){
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


// function set_replacers(preprocessed_object) {
//     $(preprocessed_object.terms).each(function(i, el) {
//         //   console.log(el.normal, replaced_arr, $.inArray(el.normal, replaced_arr));
//         //   if($.inArray(el.normal, replaced_arr) < 0){
//         if (el.pos.Person || el.pos.Value || el.pos.Currency || el.pos.Date || el.pos.Organization || el.pos.Place) {
//             if (term_is_capitalised(el.text)) {
//                 // el.has_been_replaced = true;
//                 el.replacement = get_replacement(el.tag, 'capitalise');
//             } else if (el.is_acronym()) {
//                 // el.has_been_replaced = true;
//                 el.replacement = get_replacement(el.tag, 'acronym');
//             } else {
//                 // el.has_been_replaced = true;
//                 el.replacement = get_replacement(el.tag, 'none');
//             }
//         }
//     });
//     return preprocessed_object;
// }

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

// function eligible_for_replacement(stringinput) {
//     var eligible;
//     $(temp_replacers).each(function(i, el) {
//         if (el.original != stringinput) {
//             console.log(true);
//         } else {
//             console.log(false);
//         }
//     });
