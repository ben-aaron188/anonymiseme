function Mock() {
    throw new Error('Mock is a static class!');
}

Mock.mock = function (data) {
    data = data.replace(/['"]+/g, '');

    var elements = data.match(/\S+/g);

    for (var i = 0; i < elements.length; i++) {
        var letter = elements[i].substring(0, 1);

        if (letter != letter.toLowerCase()) {
            elements[i] = "XXX";
        }
    }

    var anonymized = elements.join().replace(/,/g, " ");

    if (anonymized[anonymized.length - 1] != ".") {
        anonymized += ".";
    }

    return anonymized;
}

Mock.log_mock = function (string_input) {
    console.log(Mock.mock(string_input));
}


module.exports = Mock;