function add_statement(number, content, choices) {
    var header = "Statement " + number + "/4";
    if (!$('#statement' + number + '_wrapper').length) {
        pagefocus_reset();
        $('body').prepend(
            // more info!!
            '<div class="statement_wrapper" id="statement' + number + '_wrapper">' +
            '<div class="statement_header" id="statement' + number + '_header">' + header +
            '</div>' +
            '<div class="statement_content" id="statement' + number + '_content">' + content +
            '</div>' +
            '<div class="statement_possibilities" id="statement' + number + '_possibilities">' +
            '<div class="statement_possibility" id="statement' + number + '_possibility1">' + choices.choice1 + '</div>' +
            '<div style="left: 50%;" class="statement_possibility" id="statement' + number + '_possibility2">' + choices.choice2 + '</div>' +
            '<div style="top: 50%;" class="statement_possibility" id="statement' + number + '_possibility3">' + choices.choice3 + '</div>' +
            '<div style="top: 50%; left: 50%;" class="statement_possibility" id="statement' + number + '_possibility4">' + choices.choice4 + '</div>' +
            '</div>' +
            '<div class="statement_additional" id="statement' + number + '_additional">' +
            '<div class="statement_instruction" id="statement' + number + '_instruction">' +
            "Below you can find four scenarios.</br>One of these scenarios was the basis for this text.</br></br>Which scenario number (e.g. 5) do you think was the basis for this text?" +
            '</div>' +
            '<input type="text" maxlength="1" class="text_input1_text" id="statement' + number + '_input" placehoder="your answer">' +
            '<div class="statement_evaluation" id="statement' + number + '_evaluation">' +
            '<div style="top: 25%;" class="slider_io">' +
            '<span id="slider_instr">How certain are you of your choice (in %)?</span> ' +
            '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_certainty" value="50" min="0" max="100" step="5" oninput="set_certainty_slider_value(' + number + ')">' +
            '<output class="slider_io_output" id="certainty_output_' + number + '">move the slider</output> ' +
            '</div>' +
            '<div style="top: 55%;" class="slider_io">' +
            '<span id="slider_instr">How easy to read do you find this text (in %)?</span> ' +
            '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_readability" value="50" min="0" max="100" step="5" oninput="set_readability_slider_value(' + number + ')">' +
            '<output class="slider_io_output" id="readability_output_' + number + '">move the slider</output> ' +
            '</div>' +
            '<div style="top: 85%;" class="slider_io">' +
            '<span id="slider_instr">How plausible do you find this text (in %)?</span> ' +
            '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_plausibility" value="50" min="0" max="100" step="5" oninput="set_plausibility_slider_value(' + number + ')">' +
            '<output class="slider_io_output" id="plausibility_output_' + number + '">move the slider</output> ' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    // activate_stretch();
}

function set_certainty_slider_value(number) {
    var input = "#statement" + number + "_certainty";
    var output = "#certainty_output_" + number;
    $(output).val($(input).val() + '%');
}

function set_readability_slider_value(number) {
    var input = "#statement" + number + "_readability";
    var output = "#readability_output_" + number;
    $(output).val($(input).val() + '%');
}

function set_plausibility_slider_value(number) {
    var input = "#statement" + number + "_plausibility";
    var output = "#plausibility_output_" + number;
    $(output).val($(input).val() + '%');
}


function check_fields(classname) {
    class_values = [];
    score = 0;
    classname.each(function() {
        if ($(this).is(":visible")) {
            $(this).each(function() {
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

function check_input(ID, min_length_of_input) {
    var alert_msg = "Please answer this question.";
    var input_length = ID.val().length;
    // console.log(input_length);
    if (input_length < min_length_of_input) {
        alert(alert_msg);
    } else {
        return true;
    }
}


function check_choice(classname) {
    class_values = [];
    var value = 0;

    classname.each(function() {
        if ($(this).is(":visible")) {
            value = $(this).val();
        }
    });

    if (value == 1 || value == 2 || value == 3 || value == 4) {
        return true;
    } else {
        alert("Please give a valid answer. Type the number of the scenario that you think is correct (i.e. 1, 2, 3, or 4).");
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
        ID.keypress(function(e) {
            var code = e.keyCode || e.which;
            if (code != 8 && code !== 0 && (code < 48 || code > 57)) {
                return false;
            }
        });
    } else if (allowedInput == "text") {
        ID.keypress(function(e) {
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
    current_div.hide(function() {
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
    $.get("http://ipinfo.io", function(response) {
        window.clientip = response.ip;
    }, "jsonp");
}

function check_slider(classname) {
    class_values = [];
    score = 0;
    classname.each(function() {
        if ($(this).is(":visible")) {
            class_values.push($(this).val().length);
            score = $.inArray(15, class_values);
        }
    });
    if (score != -1) {
        alert("Please move all sliders to indicate your certainty, the ease of reading and the plausibility of this text.");
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
    var index = Math.floor(Math.random() * statement_array_proxy.length);
    var element = data_statements[index];
    statement_array_proxy.splice(index, 1);
    var statement;

    while (element.category != category) {
        index = Math.floor(Math.random() * data_statements.length);
        element = data_statements[index];
    }

    if (type === 0) {
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

function get_content_2(type, category) {
    var available_elements = [];
    var statement;
    $(data_statements).each(function(i, eli) {
        if (eli.category == category) {
            available_elements.push(eli);
        }
    });
    var selected_element = shuffle(available_elements)[0];
    data_statements.splice(data_statements.indexOf(selected_element), 1);

    if (type === 0) {
        statement = selected_element.original;
    } else if (type == 1) {
        statement = selected_element.sner;
    } else if (type == 2) {
        statement = selected_element.ukda;
    } else {
        statement = selected_element.human;
    }
    console.log(selected_element.id);
    return [selected_element, statement, type, selected_element.choices];
}

function hide_show_next() {
    $("#next").hide();
    setTimeout(function() {
        $("#next").show();
    }, text_timeout);
}

function start_timer() {
    t1 = now();
}

function end_timer() {
    var t2 = now();
    var elapsed = t2 - t1;
    return elapsed;
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
$.fn.stretch_text = function() {
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

var now = (function() {
    var performance = window.performance || {};
    performance.now = (function() {
        return performance.now ||
            performance.webkitNow ||
            performance.msNow ||
            performance.oNow ||
            performance.mozNow ||
            function() {
                return new Date().getTime();
            };
    })();
    return performance.now();
});
