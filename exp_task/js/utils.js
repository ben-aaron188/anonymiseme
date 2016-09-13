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

function validate_text(ID, desiredLength, test_kind) {
    // text_validation = false;
    if (test_kind == 'both') {
        if (check_text(ID, desiredLength) === true) {
            if (check_input(ID) === true) {
                text_validation = true;
                // alert('text validated');
                return true;
            }
        }
    } else if (test_kind == 'length') {
        if (check_text(ID, desiredLength) === true) {
            text_validation = true;
            // alert('text validated');
            return true;
        }
    } else if (test_kind == 'content') {
        if (check_input(ID) === true) {
            text_validation = true;
            // alert('text validated');
            return true;
        }
    }
}

function check_input(ID) {
    keywords = ["the", "to", "in", "at", "with", "by", "of", "a", "an", "from", "on", "there", "here", "I", "you", "they", "we", "us", "is", "it"];
    tester_array = [];
    tester2 = 0;
    textin = ID.val().toLowerCase().split(" ");
    $.each(keywords, function(index, val) {
        tester = $.inArray(val, textin);
        if (tester < 0) {
            tester2 = 0;
        } else {
            tester2 = 1;
        }
        tester_array.push(tester2);
    });
    checksum_tester = sum(tester_array);
    if ((checksum_tester / textin.length) < 0.025) {
        alert("Please use real English words and sentences in your answer. You will not be able to proceed otherwise. We cannot validate your participation without serious participation.");
    } else {
        return true;
    }
}

function check_text(ID, desiredLength) {
    var raw = ID.val().toLowerCase().replace(/ /g, '');
    if (raw.length < desiredLength) {
        alert("Please use at least " + desiredLength + " characters to answer this questions.");
    } else {
        return true;
    }
}

function sum(arr) {
    var r = 0;
    $.each(arr, function(i, v) {
        r += v;
    });
    return r;
}

function record_elapsed_start(ID) {
    elapsed = 0;
    ID.keypress(function(e) {
        time1 = now();
    });
}

function record_elapsed_end(ID) {
    time2 = now();
    elapsed = time2 - time1;
}


function get_length(ID) {
    lengthtext = ID.val().toLowerCase().split(" ");
    id_length = lengthtext.length;
    // return id_length;
}

function record_deletes(ID) {
    var listen = true;
    deletions_arr = [];
    ID.keydown(function(e) {
        if (listen === true) {
            var code = e.keyCode || e.which;
            if (code == 8) {
                deletions_arr.push(1);
            }
        }
    });
}

function record_gaps(ID) {
    var listen = true;
    elapsed_arr = [];
    var t0 = now();
    ID.keydown(function(e) {
        if (listen === true) {
            var t1 = now();
            var elapsed = t1 - t0;
            elapsed_arr.push(elapsed.toFixed(2));
            t0 = now();
        }
    });
}

function q_meta_init(ID) {
    // elapsed
    record_elapsed_start(ID);
    // deletions
    record_deletes(ID);
    // interruptions
    record_gaps(ID);
}

function q_meta_retrieve(ID, abbrev_q_code) {
    // length
    get_length(ID);
    // elapsed
    record_elapsed_end(ID);

    var length_proxy = abbrev_q_code + '_length';
    var elapsed_proxy = abbrev_q_code + '_elapsed';
    var deletions_proxy = abbrev_q_code + '_deletions';
    var gaps_proxy_100 = abbrev_q_code + '_gaps_100';
    var gaps_proxy_200 = abbrev_q_code + '_gaps_200';
    var gaps_proxy_300 = abbrev_q_code + '_gaps_300';

    window[length_proxy] = id_length;
    window[elapsed_proxy] = elapsed.toFixed(2);
    window[deletions_proxy] = deletions_arr.length;
    window[gaps_proxy_100] = elapsed_arr.filter(function(x) {
        return x > 100;
    }).length;
    window[gaps_proxy_200] = elapsed_arr.filter(function(x) {
        return x > 200;
    }).length;
    window[gaps_proxy_300] = elapsed_arr.filter(function(x) {
        return x > 300;
    }).length;
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

function capitalise_string(stringinput) {
    var string_old = stringinput;
    var new_string = string_old[0].toUpperCase() + string_old.slice(1).toLowerCase();
    return new_string;
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
        alert("Please move the sliders to give your answers.");
        score = 0;
    } else {
        return true;
    }
}
