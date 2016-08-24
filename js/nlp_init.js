// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

// init
nlp = window.nlp_compromise;
lexicon = nlp.lexicon();

// set example string
// string_input = "A weekend away in Paris sightseeing, travelling from Stansted Airport.-I'm not going there to meet anyone, I'm going there for a short weekend break.-Flight was first, then accommodation, then parking at WWF for my car at the airport.-The hotel was hardest to plan, hard to book a hotel cheap enough for my needs.-Not sure about what the most pleasant event I expect to happen will be, I haven't got anything major planned for the weekend.-The flight and traveling as I don't enjoy flying and traveling.-I will read a book or meditate while I'm waiting for the flight.-I will take public transport to get to the hotel from the airport.-Check in to my hotel and relax for a while before going out for dinner.-Probably sleep as I will be very tired after the weekend away.";

string_input = "I will meet Mike in Paris! Then Mike and I will move on to London.";

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
