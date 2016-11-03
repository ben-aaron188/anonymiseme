var Client = require('./src/client.js');
var Mock = require('./ukd/mock.js');

//var string_input = "Peter Francis Parker is a German football player. He was born in Berlin and raised in Magdeburg. Parker is married. His wife is called Sandra Sanderson. Sanderson is an actress.";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, false);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), true);
}