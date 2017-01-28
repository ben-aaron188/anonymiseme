var Client = require('./src/client.js');
var Mock = require('./ukd/mock.js');

// var string_input = "Peter went to Munich yesterday and met Luke in Cologne yesterday.";
var string_input = "Emily decided to take her mentally challenged sister Ava on the holiday of her lifetime. Ava was a big fan of the film La Grande Belezza so they decided to go to Italy for 7 weeks. They flew from Newcastle to Bologna and stayed there for a couple of days. Emily rented a car and drove them down south to Florence, where they were planning to stay for only two days. Unfortunately, Ava got severe food poisoning, so they were forced to stay for almost a week. After that, they drove down south to see Rome, the city of La Grande Belezza. It couldn’t be more disappointing!  July 2014 would later be known as one of the warmest summers in Italian history. This was just too much for Ava, who was still weak from her food poisoning. They found Rome way too touristy, nothing like the imaged portrayed by the movie. After they had stayed there for five days, they decided to visit their uncle Jack in Naples, who worked there as a captain. They stayed there for 11 days and then decided to go home.";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, false, false);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), true, false);
} else if (process.argv[2] == "partial") {
    Client.replace_combined(string_input, false, true);
}
