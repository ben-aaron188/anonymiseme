function check_fields(classname) {
    class_values = [];
    score = 0;
    classname.each(function () {
        if ($(this).is(":visible")) {
            $(this).each(function () {
                class_values.push($(this).val().length);
                score = $.inArray(0, class_values);
            });
        }
    });
    if (score > -1) {
        alert("Please answer all questions.");
        score = 0;
    } else {
        return true;
    }
}

function check_choice(classname) {
    class_values = [];
    var value = 0;

    classname.each(function () {
        if ($(this).is(":visible")) {
            value = $(this).val();
        }
    });

    if (value == 1 || value == 2 || value == 3 || value == 4) {
        return true;
    } else {
        alert("Please give a valid answer. Type the number of the scenario that you think is correct.");
        value = 0;
    }
}


function has_second_language() {
    if ($("#bilingual_sel").val() == "1") {
        return true;
    } else {
        return false;
    }
}

function define_keys(ID, allowedInput, allowedMax) {
    if (allowedInput == "number") {
        ID.keypress(function (e) {
            var code = e.keyCode || e.which;
            if (code != 8 && code !== 0 && (code < 48 || code > 57)) {
                return false;
            }
        });
    } else if (allowedInput == "text") {
        ID.keypress(function (e) {
            var code = e.keyCode || e.which;
            if (code > 32 && (code < 65 || code > 90) &&
                (code < 97 || code > 122)) {
                return false;
            }
        });
    }
}

function randomdigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function twoletters() {
    var output = "";
    var choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 2; i++)
        output += choices.charAt(Math.floor(Math.random() * choices.length));
    return output;
}

function shuffle(array) {
    var newarr = [];
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        newarr[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return newarr;
}

function init_data() {
    data = {};
}

function simple_transition(current_div, next_div) {
    current_div.hide(function () {
        next_div.show();
    });
}

function send_to_server() {
    if (check_fields($(".select_menu")) === true) {
        var data = get_data();
        $("#DATA").val(JSON.stringify(data));
        $("#submit").click();
    }
}

function getIP() {
    $.get("http://ipinfo.io", function (response) {
        window.clientip = response.ip;
    }, "jsonp");
}

function check_slider(classname) {
    class_values = [];
    score = 0;
    classname.each(function () {
        if ($(this).is(":visible")) {
            class_values.push($(this).val().length);
            score = $.inArray(15, class_values);
        }
    });
    if (score != -1) {
        alert("Please move all sliders to indicate your certainty, the readability and the plausibility of this description.");
        score = 0;
    } else {
        return true;
    }
}

function get_type() {
    var index = Math.floor(Math.random() * types.length);
    var type = types[index];
    types.splice(index, 1);
    return type;
}


function get_content(type, category) {
    var index = Math.floor(Math.random() * data_statements.length);
    var element = data_statements[index];
    var statement;

    while (element.category != category) {
        index = Math.floor(Math.random() * data_statements.length);
        element = data_statements[index];
    }

    if (type == 0) {
        statement = element.original;
    } else if (type == 1) {
        statement = element.sner;
    } else if (type == 2) {
        statement = element.ukda;
    } else {
        statement = element.human;
    }


    return [element, statement, type, element.choices];
}

function get_unid(val_score) {
    // if (val_score === 0) {
    //     unid = twoletters() + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9);
    // } else {
    //     unid = twoletters() + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + "_X";
    // }
    if (val_score === 0) {
        unid = twoletters() + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9);
    } else {
        unid = twoletters() + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + "_" + val_score;
    }
}

// source" http://stackoverflow.com/questions/5976289/stretch-text-to-fit-width-of-div
$.fn.stretch_text = function () {
    var elmt = $(this),
        cont_width = elmt.width(),
        txt = elmt.html(),
        one_line = $('<span class="stretch_it">' + txt + '</span>'),
        nb_char = elmt.text().length,
        spacing = cont_width / nb_char,
        txt_width;

    elmt.html(one_line);
    txt_width = one_line.width();

    if (txt_width < cont_width) {
        var char_width = txt_width / nb_char,
            ltr_spacing = spacing - char_width + (spacing - char_width) / nb_char;

        one_line.css({
            'letter-spacing': ltr_spacing
        });
    } else {
        one_line.contents().unwrap();
        elmt.addClass('justify');
    }
};

var now = (function () {
    var performance = window.performance || {};
    performance.now = (function () {
        return performance.now ||
            performance.webkitNow ||
            performance.msNow ||
            performance.oNow ||
            performance.mozNow ||
            function () {
                return new Date().getTime();
            };
    })();
    return performance.now();
});
