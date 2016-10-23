var Client = require('./src/client.js');
var Mock = require('./ukd/mock.js');

var string_input = "Franz is a German citizen living in Manchester. He works for the University of Manchester since 2000.";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, false);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), true);
}