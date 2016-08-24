// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

// init
nlp = window.nlp_compromise;
lexicon = nlp.lexicon();

string_input = "Shelby, the oldest of three siblings in a family of Palestinian descent, was working and planning to start college in the fall. Her mother, Darlene Farah, had been nervous when her daughter started as a manager of the Metro PCS branch, which was in a high-crime part of town, miles from their home near the beach. But Shelby told her mother she felt comfortable in the neighborhood; she’d gone to high school nearby, attending a magnet program on criminal justice. She was nicknamed “peacemaker” in middle school because she couldn’t stand to see kids argue. An accomplished cheerleader, she volunteered for two seasons as a coach for a group of girls instead of pursuing a chance to make the cheerleading squad for the Jaguars football team.";

setTimeout(function() {
    $('#ex1').text(string_input);
}, 500);

function preprocess_string(string) {
    var text_nlp = nlp.text(string);
    var input_text = text_nlp.text();
    var source_text = {
        raw: text_nlp.text(),
        normal: text_nlp.normal(),
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
