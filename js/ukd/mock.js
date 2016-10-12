function Mock() {
    throw new Error('Mock is a static class!');
}

Mock.mock = function (data) {
    var elements = data.match(/\S+/g);

    for (var i = 0; i < elements.length; i++) {
        var letter = elements[i].substring(0, 1);

        if (letter != letter.toLowerCase()) {
            elements[i] = "XXX";
        }
    }

    return (elements.join().replace(/,/g, " "));
}

Mock.log_mock = function (string_input) {
    console.log(Mock.mock(string_input));
}


module.exports = Mock;