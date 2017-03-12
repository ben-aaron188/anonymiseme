var Client = require('./src/client.js');
var Mock = require('./src/types/mock.js');


var string_input = "Sophia was born on April 15, 1980. She wasn’t a very bright girl, though everybody loved her. She went to Toronto in April 2006 to live with her boyfriend Alexander who wasn’t very smart either. She got a job as a concierge at Blackberry. Even though everybody liked her personality she wasn’t very good at her job, so she got fired. Sophia and Alexander moved to Atlanta because of better job opportunities. After many solicitations she finally got a job as a deliveryman at Amazon. She had a steady income so she tried to have a baby. After 7 years she finally got pregnant. She named her newborn baby Jayden.";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, 0);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), 1);
} else if (process.argv[2] == "partial") {
    Client.replace_combined(string_input, 2);
}
