var nlp = require('./libs/compromise/nlp_compromise.min.js');
var additional_male_names = require('../lexicon/male.js');
var additional_female_names = require('../lexicon/female.js');
var Replacer = null;

var string_input = "My boyfriend and I spent our last summer holiday in Italy, Montenegro and Croatia. We arrived at the 23rd of July in Bari, Italy, and stayed there for three days. The city is beautiful: it has a really old center, and there are small bakeries and restaurants at every corner of the street. Located close to Bari (only 1 hour by train) is Monopoli, a small, white-stoned town built on cliffs overlooking the Mediterranean Sea. It has a lot of small beaches where families gather to fight each other over one of the scarce spots to enjoy the sun and the waves. After Italy, we took an enormous ferry to Montenegro, and stayed there for one week. We started in Kotor, a medieval town next to the Adriatic Sea, and drove all around the country, from the mountains in the north at the Durmitor National Park, to Lake Skadar in the south. Finally, we went to Pasman island in Croatia, and also visited Zadar, one of the oldest cities in Croatia with an intriguing sea organ that produces really spooky music.";


replace_combined(string_input);

function replace_combined(string_input) {
    var type = 3;
    var temp_prep = preprocess_string(string_input);

    _Replacer().string_replace_all(temp_prep, type);
}

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

function _Replacer() {
    if (!Replacer) {
        Replacer = require('./nlp_replacer.js');
    }

    return Replacer;
};

