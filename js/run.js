var Client = require('./src/client.js');
var Mock = require('./ukd/mock.js');

var string_input = "Sir Richard Charles Nicholas Branson (born 18 July 1950) is an English business magnate, investor and philanthropist. He founded the Virgin Group, which controls more than 400 companies. Branson expressed his desire to become an entrepreneur at a young age. At the age of sixteen his first business venture was a magazine called Student. In 1970, he set up a mail-order record business. In 1972, he opened a chain of record stores, Virgin Records, later known as Virgin Megastores. Branson's Virgin brand grew rapidly during the 1980s, as he set up Virgin Atlantic and expanded the Virgin Records music label. In March 2000, Branson was knighted at Buckingham Palace for services to entrepreneurship. In July 2015, Forbes listed Branson's estimated net worth at US $5.2 billion.";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, false);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), true);
}