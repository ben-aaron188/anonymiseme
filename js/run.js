var Client = require('./src/client.js');
var Mock = require('./src/types/mock.js');


var string_input = "Jacob and Melissa have been friends since high school. In July 2015 they were traveling together for 6 weeks. This was their dream since they had been kids. They then began the trip in Quito and went to Lima, Cuzco and Santiago. Along the way they have occasionally been unlucky. For instance, Melissa lost her debit card the when they arrived in Quito and 3 days later Jacob tore his ankle during a hike to a waterfall. Nevertheless they could laugh about it. During the trip they met Nathan. They became friends and he joined them. Besides that it was very nice, it also gave benefits. They could rent a car and they did. It was the best time of their lives.";

if (process.argv[2] == "alt") {
    Mock.log_mock(string_input);
} else if (!process.argv[2]) {
    Client.replace_combined(string_input, 0);
} else if (process.argv[2] == "ult") {
    Client.replace_combined(Mock.mock(string_input), 1);
} else if (process.argv[2] == "partial") {
    Client.replace_combined(string_input, 2);
}
