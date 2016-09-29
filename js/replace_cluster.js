var nlp = require('./libs/compromise/nlp_compromise.min.js');
var additional_male_names = require('../lexicon/male.js');
var additional_female_names = require('../lexicon/female.js');
var Replacer = null;


var string_input = "Brad Pitt is to miss a premiere of his latest film to focus on his \"family situation\", he has said. " +
    "The actor has been the focus of press attention since it was revealed that Angelina Jolie has applied for divorce. " +
    "He narrated director Terrence Malick's epic documentary Voyage of Time, about the birth of the Universe. " +
    "He said he did not want his presence at the California Science Centre Imax Theatre in Los Angeles on Wednesday to \"distract attention\" from the film. " +
    "In a statement, Pitt said: \"Terrence's Voyage of Time is an incredibly beautiful and unique experiential Imax film for children and families chronicling the birth of time. " +
    "\"I'm very grateful to be part of such a fascinating and educational project, but I'm currently focused on my family situation and don't want to distract attention away from this extraordinary film, which I encourage everyone to see.\" " +
    "Cate Blanchett has narrated a different feature-length version of the film. Pitt, 52, previously appeared in Malick's 2011 film Tree of Life. " +
    "Jolie, 41, has filed for divorce citing irreconcilable differences and asked for physical custody of their six children. " +
    " The couple married in 2014 after 10 years together. Jolie's lawyer Robert Offer said the actress had filed for the dissolution of the marriage \"for the health of the family\".";

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
}
