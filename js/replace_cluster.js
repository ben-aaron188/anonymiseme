var nlp = require('./libs/compromise/nlp_compromise.min.js');
var additional_male_names = require('../lexicon/male.js');
var additional_female_names = require('../lexicon/female.js');
var Replacer = null;

var string_input = "The City of New York, often called New York City, New York, or simply The City, is the most populous city in the United States. Located at the southern tip of the state of New York, the city is the center of the New York metropolitan area, one of the most populous urban agglomerations in the world. With a U.S. Census Bureau-estimated 2015 population of 8,550,405 distributed over a land area of just 305 square miles (790 km2), New York is also the most densely populated major city in the United States. A global power city, New York City exerts a significant impact upon commerce, finance, media, art, fashion, research, technology, education, and entertainment, its fast pace defining the term New York minute. Home to the headquarters of the United Nations, New York is an important center for international diplomacy and has been described as the cultural and financial capital of the world. Situated on one of the world's largest natural harbors, New York City consists of five boroughs, each of which is a separate county of New York State. The five boroughs – Brooklyn, Queens, Manhattan, The Bronx, and Staten Island – were consolidated into a single city in 1898. The city and its metropolitan area constitute the premier gateway for legal immigration to the United States, and as many as 800 languages are spoken in New York, making it the most linguistically diverse city in the world. By 2015 estimates, the New York City metropolitan region remains by a significant margin the most populous in the United States, as defined by both the Metropolitan Statistical Area (20.2 million residents) and the Combined Statistical Area (23.7 million residents). In 2013, the MSA produced a gross metropolitan product (GMP) of nearly US$1.39 trillion, while in 2012, the CSA generated a GMP of over US$1.55 trillion, both ranking first nationally by a wide margin and behind the GDP of only twelve and eleven countries, respectively. New York City traces its origin to its 1624 founding in Lower Manhattan as a trading post by colonists of the Dutch Republic and was named New Amsterdam in 1626. The city and its surroundings came under English control in 1664 and were renamed New York after King Charles II of England granted the lands to his brother, the Duke of York. New York served as the capital of the United States from 1785 until 1790. It has been the country's largest city since 1790. The Statue of Liberty greeted millions of immigrants as they came to the Americas by ship in the late 19th and early 20th centuries and is a symbol of the United States and its democracy. In the 21st century, New York has emerged as a global node of creativity and entrepreneurship,[46] social tolerance, and environmental sustainability. Many districts and landmarks in New York City have become well known, and the city received a record of nearly 60 million tourists in 2015, hosting three of the world's ten most visited tourist attractions in 2013. Several sources have ranked New York the most photographed city in the world. Times Square, iconic as the world's 'heart' and its 'Crossroads', is the brightly illuminated hub of the Broadway Theater District, one of the world's busiest pedestrian intersections, and a major center of the world's entertainment industry. The names of many of the city's bridges, tapered skyscrapers, and parks are known around the world. Anchored by Wall Street in the Financial District of Lower Manhattan, New York City has been called both the most economically powerful city and the leading financial center of the world, and the city is home to the world's two largest stock exchanges by total market capitalization, the New York Stock Exchange and NASDAQ. Manhattan's real estate market is among the most expensive in the world. Manhattan's Chinatown incorporates the highest concentration of Chinese people in the Western Hemisphere, with multiple signature Chinatowns developing across the city. Providing continuous 24/7 service, the New York City Subway is one of the most extensive metro systems worldwide, with 469 stations in operation. New York City's higher education network comprises over 120 colleges and universities, including Columbia University, New York University, and Rockefeller University, which have been ranked among the top 35 in the world.";

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
