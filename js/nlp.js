// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

// init
nlp = window.nlp_compromise;

// set example string
string_input = "I'll be flying to London next week with my two friends Paul and Mike.";


setTimeout(function() {
    $("#ex1").text(string_input);
}, 500);


// pre-processing
// 1. normalisation
processed_text = string_input.normalize();

// init object
var source_text = {
    raw: string_input,
    processed: processed_text,
    nlp_persons_raw: nlp.text(processed_text).people(),
    nlp_orgs_raw: nlp.text(processed_text).organizations(),
    nlp_locations_raw: nlp.text(processed_text).places(),
    nlp_values_raw: nlp.text(processed_text).values(),
    nlp_dates_raw: nlp.text(processed_text).dates(),
};

// ------> entity extraction needs refinement

// highlight NEs
function highlight_single_entities(entity) {
    var text_proxy = this.processed;
    var word_separated_string = text_proxy.replace(/([ .,;]+)/g, '$1§sep§').split('§sep§');
    var span_wrap = [];
    var ne_string_arr = [];
    switch (entity) {
        case 'persons':
            ne_string_arr = map_to_array(this.nlp_persons_raw);
            break;
        case 'locations':
            ne_string_arr = map_to_array(this.nlp_locations_raw);
            break;
        case 'dates':
            ne_string_arr = map_to_array(this.nlp_dates_raw);
            break;
        case 'values':
            ne_string_arr = map_to_array(this.nlp_values_raw);
            break;
    }
    $(word_separated_string).each(function(i, el) {
        if ($.inArray(el.trim(), ne_string_arr) > -1) {
            switch (entity) {
                case 'persons':
                    span_wrap.push('<span class="highlighted persons">' + el + '</span>');
                    break;
                case 'locations':
                    span_wrap.push('<span class="highlighted locations">' + el + '</span>');
                    break;
                case 'values':
                    span_wrap.push('<span class="highlighted values">' + el + '</span>');
                    break;
                case 'dates':
                    span_wrap.push('<span class="highlighted dates">' + el + '</span>');
                    break;
                default:
                    span_wrap.push('<span class="highlighted">' + el + '</span>');
            }
        } else {
            span_wrap.push('<span class="non_highlighted">' + el + '</span>');
        }
    });
    $('#ex2').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex2').append(el);
        // change to replacer
    });
}

function highlight_all_entities() {
    var text_proxy = this.processed;
    var word_separated_string = text_proxy.replace(/([ .,;]+)/g, '$1§sep§').split('§sep§');
    var span_wrap = [];
    var ne_string_arr_persons = map_to_array(this.nlp_persons_raw);
    var ne_string_arr_locations = map_to_array(this.nlp_locations_raw);
    var ne_string_arr_dates = map_to_array(this.nlp_dates_raw);
    var ne_string_arr_values = map_to_array(this.nlp_values_raw);
    $(word_separated_string).each(function(i, el) {
        if ($.inArray(el.trim(), ne_string_arr_persons) > -1) {
            span_wrap.push('<span class="highlighted persons">' + el + '</span>');
        } else if ($.inArray(el.trim(), ne_string_arr_locations) > -1) {
            span_wrap.push('<span class="highlighted locations">' +  el + '</span>');
        } else if ($.inArray(el.trim(), ne_string_arr_dates) > -1) {
            span_wrap.push('<span class="highlighted dates">' + el + '</span>');
        } else if ($.inArray(el.trim(), ne_string_arr_values) > -1) {
            span_wrap.push('<span class="highlighted values">' + el + '</span>');
        } else {
            span_wrap.push('<span class="non_highlighted">' + el + '</span>');
        }
    });
    $('#ex2').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex2').append(el);
        // change to replacer
    });
}


// extract NEs
function extract_entities() {
    var persons_proxy = map_to_array(this.nlp_persons);
    var locations_proxy = map_to_array(this.nlp_locations);
    var dates_proxy = map_to_array(this.nlp_dates);
    var values_proxy = map_to_array(this.nlp_values);
    this.nlp_persons = persons_proxy;
    this.nlp_locations = locations_proxy;
    this.nlp_dates = dates_proxy;
    this.nlp_values = values_proxy;
}

// replace NEs

// ---------> build exceptions: pronoun-based NLP replacement
// ---------> check white_space properties
function replace_single_entities_stage1(entity) {
    var text_proxy = this.processed;
    var word_separated_string = text_proxy.replace(/([ .,;]+)/g, '$1§sep§').split('§sep§');
    var span_wrap = [];
    var ne_string_arr = [];
    switch (entity) {
        case 'persons':
            ne_string_arr = map_to_array(this.nlp_persons_raw);
            break;
        case 'locations':
            ne_string_arr = map_to_array(this.nlp_locations_raw);
            break;
        case 'dates':
            ne_string_arr = map_to_array(this.nlp_dates_raw);
            break;
        case 'values':
            ne_string_arr = map_to_array(this.nlp_values_raw);
            break;
    }
    $(word_separated_string).each(function(i, el) {
        if ($.inArray(el.trim(), ne_string_arr) > -1) {
            switch (entity) {
                case 'persons':
                    span_wrap.push('<span class="highlighted persons">' + 'Harry Potter ' + '</span>');
                    break;
                case 'locations':
                    span_wrap.push('<span class="highlighted locations">' + 'Hogwarts ' + '</span>');
                    break;
                case 'values':
                    span_wrap.push('<span class="highlighted values">' + '$$$$ ' + '</span>');
                    break;
                case 'dates':
                    span_wrap.push('<span class="highlighted dates">' + 'January, 1, 1970 ' + '</span>');
                    break;
                default:
                    span_wrap.push('<span class="highlighted">' + el + '</span>');
            }
        } else {
            span_wrap.push('<span class="non_highlighted">' + el + '</span>');
        }
    });
    $('#ex2').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex2').append(el);
        // change to replacer
    });
}

function replace_all_entities_stage1(entity) {
    var text_proxy = this.processed;
    var word_separated_string = text_proxy.replace(/([ .,;]+)/g, '$1§sep§').split('§sep§');
    var span_wrap = [];
    var ne_string_arr_persons = map_to_array(this.nlp_persons_raw);
    var ne_string_arr_locations = map_to_array(this.nlp_locations_raw);
    var ne_string_arr_dates = map_to_array(this.nlp_dates_raw);
    var ne_string_arr_values = map_to_array(this.nlp_values_raw);
    $(word_separated_string).each(function(i, el) {
        if ($.inArray(el.trim(), ne_string_arr_persons) > -1) {
            span_wrap.push('<span class="highlighted persons">' + 'Harry Potter ' + '</span>');
        } else if ($.inArray(el.trim(), ne_string_arr_locations) > -1) {
            span_wrap.push('<span class="highlighted locations">' + 'Hogwarts ' + '</span>');
        } else if ($.inArray(el.trim(), ne_string_arr_dates) > -1) {
            span_wrap.push('<span class="highlighted dates">' + 'January, 1, 1970 ' + '</span>');
        } else if ($.inArray(el.trim(), ne_string_arr_values) > -1) {
            span_wrap.push('<span class="highlighted values">' + '$$$$ ' + '</span>');
        } else {
            span_wrap.push('<span class="non_highlighted">' + el + '</span>');
        }
    });
    $('#ex2').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex2').append(el);
        // change to replacer
    });
}

function replace_all_entities_stage2(entity) {
    var text_proxy = this.processed;
    var word_separated_string = text_proxy.replace(/([ .,;]+)/g, '$1§sep§').split('§sep§');
    var span_wrap = [];
    var ne_string_arr_persons = map_to_array(this.nlp_persons_raw);
    var ne_string_arr_locations = map_to_array(this.nlp_locations_raw);
    var ne_string_arr_dates = map_to_array(this.nlp_dates_raw);
    var ne_string_arr_values = map_to_array(this.nlp_values_raw);
    $(word_separated_string).each(function(i, el) {
        if ($.inArray(el.trim(), ne_string_arr_persons) > -1) {
            span_wrap.push('<span class="highlighted persons">' + 'Harry Potter ' + '</span>');
        } else if ($.inArray(el.trim(), ne_string_arr_locations) > -1) {
            span_wrap.push('<span class="highlighted locations">' + 'Hogwarts ' + '</span>');
        } else if ($.inArray(el.trim(), ne_string_arr_dates) > -1) {
            span_wrap.push('<span class="highlighted dates">' + 'January, 1, 1970 ' + '</span>');
        } else if ($.inArray(el.trim(), ne_string_arr_values) > -1) {
            span_wrap.push('<span class="highlighted values">' + '$$$$ ' + '</span>');
        } else {
            span_wrap.push('<span class="non_highlighted">' + el + '</span>');
        }
    });
    $('#ex2').text('');
    $(span_wrap).each(function(i, el) {
        $('#ex2').append(el);
        // change to replacer
    });
}


// implement as jquery methods of `source_text`
source_text.highlight_single = highlight_single_entities;
// call it like source_text.highlight('persons') ... DOCS

source_text.highlight_all = highlight_all_entities;
// call it like source_text.highlight() ... DOCS

source_text.extract = extract_entities;
// call it like source_text.extract()
// access it processed array via source_text object: source_text.nlp_persons

source_text.replace1_single = replace_single_entities_stage1;
// call it like source_text.replace1()

source_text.replace1_all = replace_all_entities_stage1;
// call it like source_text.replace1()
