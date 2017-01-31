var Client = require('./src/client.js');
var Mock = require('./ukd/mock.js');

// var string_input = "Peter went to Munich yesterday and met Luke in Cologne yesterday.";
var string_input = "Isabelle is a girl from Austin, Texas. Isabella was very young when her brother Logan was born On July 30, 1979. He became one of the most important persons in her life. Isabella didn’t know anything about technology and her brother taught her everything he knew. He even gave her a computer when he worked at Dell. Logan died of cancer 12 years after he gave Isabella her first computer. She was devastated but wanted to use all her computer knowledge. She applied for a job at Packard Bell in Barcelona in October 2004. She got hired by Charlie who saw a potential in the love she had developed for computers.";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, false, false);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), true, false);
} else if (process.argv[2] == "partial") {
    Client.replace_combined(string_input, false, true);
}
