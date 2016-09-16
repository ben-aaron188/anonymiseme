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
//string_input = "On 06/18/2014 Alfred and I went to the bookstore in Amsterdam. We spent 1 hour there and I bought 3 new books about Birmingham. After that we went to Melbourne for 3 weeks.";

//string_input = "My friends and I traveled to the Ukraine last year during the Summer break. We arrived in southern Spain late in the evening and thus did not have the time to discover the city a bit more in detail that night. The next morning, we took a cab to Barcelona and discovered the city. After a long and interesting day, we took another cab back to Malaga in order to recover at the Hotel. The days after we travelled along the Adriatic Coast, visiting as much cities as possible. We went to a lot of cities, amongst others Rome, Dresden and Lisbon. All in all, I can look back to a successful holiday and to a great experience where I was able to really discover the Swedish culture and way of living.";

string_input = "One of my favourite travel destinations are the Netherlands! I went there in 1990 when I was 26 with my friend David. We went mountainclimbing in the Alps. Another of my top travel destinations is St. Petersburg as I really love to surf and spending my holidays at the beach. I went there first in 2012, and then later another time in 2001. My grandfather and I always dreamed of visiting the Eiffel Tower so we are going to travel to Rome and visit it next year. However, my favourite travel destination within the last 5 years were the United States. My boyfriend Carina and I traveled there in 2008 in order to visit the Keys (and their crocodiles) in New England. Last but not least, I am in love with East Europe. Unfortunately, I haven't been there yet, but my brother Catherine and I are going to travel to Japan in order to visit the Caucasian Mountains.";

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
