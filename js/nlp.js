// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

// init
nlp = window.nlp_compromise;

// set example string
string_input = "I'll be flying to London next week with my two friends Paul and Mike.";

setTimeout(function() {
    $('#ex1').text(string_input);
}, 500);

function preprocess_string(string) {
    var processed_text = string.normalize();
    var source_text = {
        raw: string,
        processed: processed_text,
        nlp_persons_raw: nlp.text(processed_text).people(),
        nlp_orgs_raw: nlp.text(processed_text).organizations(),
        nlp_locations_raw: nlp.text(processed_text).places(),
        nlp_values_raw: nlp.text(processed_text).values(),
        nlp_dates_raw: nlp.text(processed_text).dates(),
    };
    return (source_text);
}

var temp_prep = preprocess_string(string_input);

// extract NEs
function extract_entities(preprocessed_object) {
    var persons_proxy = map_to_array(preprocessed_object.nlp_persons_raw);
    var locations_proxy = map_to_array(preprocessed_object.nlp_locations_raw);
    var dates_proxy = map_to_array(preprocessed_object.nlp_dates_raw);
    var values_proxy = map_to_array(preprocessed_object.nlp_values_raw);
    preprocessed_object.nlp_persons = persons_proxy;
    preprocessed_object.nlp_locations = locations_proxy;
    preprocessed_object.nlp_dates = dates_proxy;
    preprocessed_object.nlp_values = values_proxy;
    return preprocessed_object;
}


// highlight NEs
function highlight_single_entities(preprocessed_object, entity) {
    var text_proxy = preprocessed_object.processed;
    var word_separated_string = text_proxy.replace(/([ .,;]+)/g, '$1§sep§').split('§sep§');
    var span_wrap = [];
    var ne_string_arr = [];
    switch (entity) {
        case 'persons':
            ne_string_arr = map_to_array(preprocessed_object.nlp_persons_raw);
            break;
        case 'locations':
            ne_string_arr = map_to_array(preprocessed_object.nlp_locations_raw);
            break;
        case 'dates':
            ne_string_arr = map_to_array(preprocessed_object.nlp_dates_raw);
            break;
        case 'values':
            ne_string_arr = map_to_array(preprocessed_object.nlp_values_raw);
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

function highlight_all(preprocessed_object) {
    var text_proxy = preprocessed_object.processed;
    var word_separated_string = text_proxy.replace(/([ .,;]+)/g, '$1§sep§').split('§sep§');
    var span_wrap = [];
    var ne_string_arr_persons = map_to_array(preprocessed_object.nlp_persons_raw);
    var ne_string_arr_locations = map_to_array(preprocessed_object.nlp_locations_raw);
    var ne_string_arr_dates = map_to_array(preprocessed_object.nlp_dates_raw);
    var ne_string_arr_values = map_to_array(preprocessed_object.nlp_values_raw);
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
    // return span_wrap;
}


// replace NEs

// ---------> build exceptions: pronoun-based NLP replacement
// ---------> check white_space properties
function replace1_single(preprocessed_object, entity) {
    var text_proxy = preprocessed_object.processed;
    var word_separated_string = text_proxy.replace(/([ .,;]+)/g, '$1§sep§').split('§sep§');
    var span_wrap = [];
    var ne_string_arr = [];
    switch (entity) {
        case 'persons':
            ne_string_arr = map_to_array(preprocessed_object.nlp_persons_raw);
            break;
        case 'locations':
            ne_string_arr = map_to_array(preprocessed_object.nlp_locations_raw);
            break;
        case 'dates':
            ne_string_arr = map_to_array(preprocessed_object.nlp_dates_raw);
            break;
        case 'values':
            ne_string_arr = map_to_array(preprocessed_object.nlp_values_raw);
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
    $(span_wrap).each(function(i, el) {
        $('#ex2').append(el);
        // change to replacer
    });
}

function replace1_all(preprocessed_object) {
  var text_proxy = preprocessed_object.processed;
  var word_separated_string = text_proxy.replace(/([ .,;]+)/g, '$1§sep§').split('§sep§');
  var span_wrap = [];
  var ne_string_arr_persons = map_to_array(preprocessed_object.nlp_persons_raw);
  var ne_string_arr_locations = map_to_array(preprocessed_object.nlp_locations_raw);
  var ne_string_arr_dates = map_to_array(preprocessed_object.nlp_dates_raw);
  var ne_string_arr_values = map_to_array(preprocessed_object.nlp_values_raw);
  $(word_separated_string).each(function(i, el) {
      if ($.inArray(el.trim(), ne_string_arr_persons) > -1) {
          span_wrap.push('<span class="highlighted persons">' + 'Harry Potter ' + '</span>');
      } else if ($.inArray(el.trim(), ne_string_arr_locations) > -1) {
          span_wrap.push('<span class="highlighted locations">' +  'Hogwarts ' + '</span>');
      } else if ($.inArray(el.trim(), ne_string_arr_dates) > -1) {
          span_wrap.push('<span class="highlighted dates">' + 'January, 1st 1970 ' + '</span>');
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
