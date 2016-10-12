function Mock() {
    throw new Error('Mock is a static class!');
}

Mock.mock = function (data) {
    var elements = data.split(" ");

    for (var i = 0; i < elements.length; i++) {
        var letter = elements[i].substring(0, 1);

        if (letter != letter.toLowerCase()) {
            elements[i] = "XXX";
        }
    }

    console.log(elements.join().replace(/,/g, " "));
}

module.exports = Mock;