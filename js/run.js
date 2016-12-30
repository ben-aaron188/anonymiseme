var Client = require('./src/client.js');
var Mock = require('./ukd/mock.js');

// var string_input = "Peter went to Munich yesterday and met Peter in Munich yesterday.";
var string_input = "In June 2015, Alan and Joan went on a vacation to Scotland where they visited Edinburgh, Glasgow and Loch Ness. In Glasgow, they met an old friend of Joan who has been living there for almost 5 years. His name is Hugh and he showed them around the city centre. Hugh moved to Glasgow due to a job offer at KPMG, where he is working since then. After having spent 4 days with Hugh in Glasgow, Alan and Joan went back to London.";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, false, false);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), true, false);
} else if (process.argv[2] == "partial") {
    Client.replace_combined(string_input, false, true);
}
