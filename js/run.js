var Client = require('./src/client.js');
var Mock = require('./ukd/mock.js');


var string_input = "Amelia was born in Mexico City on October 19th 1970.";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, false, false);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), true, false);
} else if (process.argv[2] == "partial") {
    Client.replace_combined(string_input, false, true);
}
