// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

// entity allowed values:
function highlight_single_entities(preprocessed_object, entity) {
    var span_wrap = [];
    switch (entity) {
        case 'persons':
            $(preprocessed_object.terms).each(function(i, el) {
                if (el.pos.Person) {
                    span_wrap.push('<span class="highlighted persons">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
        case 'locations':
            $(preprocessed_object.terms).each(function(i, el) {
                if (el.pos.Place) {
                    span_wrap.push('<span class="highlighted locations">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
        case 'organizations':
            $(preprocessed_object.terms).each(function(i, el) {
                if (el.pos.Organization) {
                    span_wrap.push('<span class="highlighted organizations">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
        case 'dates':
            $(preprocessed_object.terms).each(function(i, el) {
                if (el.pos.Date) {
                    span_wrap.push('<span class="highlighted dates">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
        case 'values':
            $(preprocessed_object.terms).each(function(i, el) {
                if (el.pos.Value || el.pos.Currency) {
                    span_wrap.push('<span class="highlighted values">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                } else {
                    span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
                }
            });
            break;
    }
    $('#ex2').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex2').append(el);
        // change to replacer
    });
}

function highlight_all(preprocessed_object) {
    var span_wrap = [];
    $(preprocessed_object.terms).each(function(i, el) {
        if (el.pos.Person) {
            span_wrap.push('<span class="highlighted persons">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
        } else if (el.pos.Value || el.pos.Currency) {
            span_wrap.push('<span class="highlighted values">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
        } else if (el.pos.Date) {
            span_wrap.push('<span class="highlighted dates">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
        } else if (el.pos.Organization) {
            span_wrap.push('<span class="highlighted organizations">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
        } else if (el.pos.Place) {
            span_wrap.push('<span class="highlighted locations">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
        } else {
            span_wrap.push('<span class="non_highlighted">' + el.whitespace.preceding + el.text + el.whitespace.trailing + '</span>');
        }
    });
    $('#ex2').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex2').append(el);
    });
}
