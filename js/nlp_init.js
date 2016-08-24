// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

// init
nlp = window.nlp_compromise;
lexicon = nlp.lexicon();

// set example string

string_input = "I will meet Mike in Paris! Then Mike and I will move on to London before we leave for Rome.";

setTimeout(function () {
    $('#ex1').text(string_input);
}, 500);

function preprocess_string(string) {
    var text_nlp = nlp.text(string);
    var input_text = text_nlp.text();
    var source_text = {
        raw: text_nlp.text(),
        normal: text_nlp.normal(),
        // processed: processed_text,
        terms: text_nlp.terms(),
        nlp_persons_raw: nlp.text(input_text).people(),
        nlp_orgs_raw: nlp.text(input_text).organizations(),
        nlp_locations_raw: nlp.text(input_text).places(),
        nlp_values_raw: nlp.text(input_text).values(),
        nlp_dates_raw: nlp.text(input_text).dates(),
    };
    return (source_text);
}

function extract_entities(preprocessed_object) {
    var persons_proxy = map_to_array(preprocessed_object.nlp_persons_raw);
    var orgs_proxy = map_to_array(preprocessed_object.nlp_orgs_raw);
    var locations_proxy = map_to_array(preprocessed_object.nlp_locations_raw);
    var dates_proxy = map_to_array(preprocessed_object.nlp_dates_raw);
    var values_proxy = map_to_array(preprocessed_object.nlp_values_raw);
    preprocessed_object.nlp_persons = persons_proxy;
    preprocessed_object.nlp_orgs = orgs_proxy;
    preprocessed_object.nlp_locations = locations_proxy;
    preprocessed_object.nlp_dates = dates_proxy;
    preprocessed_object.nlp_values = values_proxy;
    return preprocessed_object;
}

var temp_prep = preprocess_string(string_input);
