var Client = require('./src/client.js');
var Mock = require('./src/types/mock.js');


var string_input = "";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, 0);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), 1);
} else if (process.argv[2] == "partial") {
    Client.replace_combined(string_input, 2);
}
