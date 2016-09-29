var slider_moved_array = [];

function check_fields(classname) {
    class_values = [];
    score = 0;
    classname.each(function() {
        if ($(this).is(":visible")) {
            // if($(this).attr('type') == 'text'){
            $(this).each(function() {
                class_values.push($(this).val().length);
                score = $.inArray(0, class_values);
            });
            // }
        }
    });
    if (score > -1) {
        alert("Please answer all questions.");
        score = 0;
    } else {
        return true;
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
        get_data();
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
        alert("Please move both sliders to give your answers.");
        score = 0;
    } else {
        return true;
    }
}

function get_content(category, callback) {
    var index = Math.floor(Math.random() * data_statements.length);
    var statement = data_statements[index];

    if (statement.category != category) {
        get_content(category, callback);
    } else {
        callback(statement);
    }


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
$.fn.stretch_text = function(){
    var elmt          = $(this),
        cont_width    = elmt.width(),
        txt           = elmt.html(),
        one_line      = $('<span class="stretch_it">' + txt + '</span>'),
        nb_char       = elmt.text().length,
        spacing       = cont_width/nb_char,
        txt_width;

    elmt.html(one_line);
    txt_width = one_line.width();

    if (txt_width < cont_width){
        var  char_width     = txt_width/nb_char,
             ltr_spacing    = spacing - char_width + (spacing - char_width)/nb_char ;

        one_line.css({'letter-spacing': ltr_spacing});
    } else {
        one_line.contents().unwrap();
        elmt.addClass('justify');
    }
};
