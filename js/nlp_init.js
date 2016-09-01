// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

// init
nlp = window.nlp_compromise;
lexicon = nlp.lexicon();

// set example string

//string_input = "I will meet Mike in Paris! Then Mike and I will move on to London before we leave for Rome on first of April 2016.";
//string_input = "I will meet Mike in Paris! Then Mike and I will move on to London before we leave for Rome on Friday with 2 Friends.";
//string_input = "234th x 11th x 100th x Second x Third x Tenth x 13/12/2014 x 11/10/2145 x Amsterdam x Peter x Peter";
string_input = "On 06/18/2014 Alfred and I went to the bookstore in Amsterdam. We spent 3 hours there and I bought 3 new books about Birmingham. After that we went to Melbourne for 3 weeks.";

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
        nlp_dates_raw: nlp.text(input_text).dates()
    };

    source_text.terms = customise_data(source_text.terms);

    return (source_text);
}

function customise_data(source) {

    for (var i = 0; i < source.length; i++) {
        var string = source[i].normal;

        if (contains(additional_male_names, string)) {
            source[i].tag = "MalePerson";
            source[i].pos.Person = true;
            source[i].pos.MalePerson = true;
        } else if (contains(additional_female_names, string)) {
            source[i].tag = "FemalePerson";
            source[i].pos.Person = true;
            source[i].pos.FemalePerson = true;
        }
        // } else if (is_city(string)) {
        //     source_text.nlp_persons_raw.push({
        //         "firstName": string,
        //         "normal": string.toLowerCase(),
        //         "tag": "City",
        //         "text": string.toLowerCase()
        //     });
        // }

    }

    return source;
}

function contains(source, text) {

    for (var i = 0; i < source.length; i++) {
        var current = source[i];

        if (text.toLowerCase() == current.toLowerCase()) {
            return true;
        }

    }

    return false;
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
