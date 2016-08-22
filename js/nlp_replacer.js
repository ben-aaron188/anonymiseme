// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

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

function replace1_all(preprocessed_object) {
    var span_wrap = [];
    var preprocessed_object2 = set_replacers(preprocessed_object);
    $(preprocessed_object2.terms).each(function(i, el) {
        if (el.pos.Person) {
            span_wrap.push('<span class="highlighted persons">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
        } else if (el.pos.Value || el.pos.Currency) {
            span_wrap.push('<span class="highlighted values">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
        } else if (el.pos.Date) {
            span_wrap.push('<span class="highlighted dates">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
        } else if (el.pos.Organization) {
            span_wrap.push('<span class="highlighted organizations">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
        } else if (el.pos.Place) {
            span_wrap.push('<span class="highlighted locations">' + el.whitespace.preceding + el.replacement + el.whitespace.trailing + '</span>');
        } else {
            span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
        }
    });
    $('#ex3').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex3').append(el);
    });
}

function get_replacement(category) {
    var alt_array = [];
    $.each(lexicon, function(key, value) {
        if (value == category) {
            alt_array.push(key);
        }
    });
    return shuffle(alt_array)[0];
}


function set_replacers(preprocessed_object) {
    $(preprocessed_object.terms).each(function(i, el) {
        if (el.pos.Person || el.pos.Value || el.pos.Currency || el.pos.Date || el.pos.Organization || el.pos.Place) {
            el.replacement = get_replacement(el.tag);
        }
    });
    return preprocessed_object;
}

// exceptions to build in:
//  - pronoun != i/I
//  - repetitions in chat
//  - limit to some key and accurate variables
