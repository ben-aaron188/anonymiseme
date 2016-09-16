// globals
var time_langtask1 = 90000;
var time_instr = 30000;
var data_array = [];
var data_statement1;
var data_statement2;
var data_statement3;
var data_statement4;
var data_example1;
var data_example2;

// task flow
$(document).ready(function () {
    unid = twoletters() + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9);
    init_data();
    getIP();
    $("#intro1").show();
    $("#next").attr('onclick', 'to_informed_consent()');
    cond1 = 2; // veracity
    cond2 = randomdigit(0, 1); //cue
    // cond2 = 1;
    cond3 = 2; //temporality
    text_validation = false;
});


function get_content(category) {
    var index = Math.floor(Math.random() * data_statements.length);
    var statement = data_statements[index];

    if (statement.category != category) {
        return get_content(category);
    }

    return statement;
}

function to_informed_consent() {
    simple_transition($("#intro1"), $("#informed_consent"));
    $("#next").attr('onclick', 'to_statement_evaluation()');
}

function to_statement_evaluation() {
    $('body').prepend('<div id="statement_explanation">' +
        'Explanation</br>' +
        'You will now first read two example statements to test whether you correctly understood the definitions we want you to apply to the main statements.</br>' +
        'Please adhere to the following two definitions of plausibility and detailedness.</br>' +
        'Plausibility = the coherency of the statement in terms of not containing logical inconsistencies or contradictions.</br>' +
        'Detailedness = the inclusion of specific descriptions of place, time, persons, objects and events.</br>' +
        'After the two examples, you get feedback and will then proceed to the four main statements.</br>' +
        '</div>'
    );

    simple_transition($("#informed_consent"), $("#statement_explanation"));
    $("#next").attr('onclick', 'to_example1()');
}

function set_plaus_slider_value(number) {
    var input = "statement" + number + "_evaluation_plausibility_value";
    var output = "plaus_output_" + number;

    document.getElementById(output).value = document.getElementById(input).value;
}

function set_vivid_slider_value(number) {
    var input = "statement" + number + "_evaluation_vividness_value";
    var output = "vivid_output_" + number;

    document.getElementById(output).value = document.getElementById(input).value;
}

function add_statement(number, example) {
    if (!example) {
        var header = "Statement " + number + "/4";
    } else {
        var header = example;
    }

    $('body').prepend(
        '<div class="statement_wrapper" id="statement' + number + '_wrapper">' +
        '<div class="statement_header" id="statement' + number + '_header">' + header + '</div>' +
        '<div class="statement_content" id="statement' + number + '_content"></div>' +
        '<div class="statement_evaluation" id="statement' + number + '_evaluation">' +
        '<div class="statement_evaluation_slider" id="statement' + number + '_evaluation_plausibility">' +
        '<div class="slider_io">' +
        '<span id="slider_instr">Plausibility</span> ' +
        '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_evaluation_plausibility_value" value="5" min="0" max="10" oninput="set_plaus_slider_value(' + number + ')">' +
        '<output class="slider_io_output" id="plaus_output_' + number + '">move the slider</output> ' +
        '</div>' +
        '</div>' +
        '<div class="statement_evaluation_slider statement_evaluation_vividness" id="statement' + number + '_evaluation_vividness">' +
        '<div class="slider_io">' +
        '<span id="slider_instr">Vividness</span> ' +
        '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_evaluation_vividness_value" value="5" min="0" max="10" oninput="set_vivid_slider_value(' + number + ')">' +
        '<output class="slider_io_output" id="vivid_output_' + number + '">move the slider</output> ' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
}

function to_example1() {
    data_example1 = examples[0];

    add_statement(5, "Example 1");

    $("#statement5_content").text(data_example1.content);
    simple_transition($("#statement_explanation"), $("#statement5_wrapper"));

    $("#next").attr('onclick', 'to_example2()');
}

function to_example2() {
    data_example2 = examples[1];

    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_example1,
            evaluation: {
                plausibility: $("#statement5_evaluation_plausibility_value").val(),
                vividness: $("#statement5_evaluation_vividness_value").val(),
            }
        })

        add_statement(6, "Example 2");

        $("#statement6_content").text(data_example2.content);
        simple_transition($("#statement5_wrapper"), $("#statement6_wrapper"));
        $("#next").attr('onclick', 'verify_examples()');
    }
}

function verify_examples() {
    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_example2,
            evaluation: {
                plausibility: $("#statement6_evaluation_plausibility_value").val(),
                vividness: $("#statement6_evaluation_vividness_value").val(),
            }
        });

        check_example_validation();
    }

}

function check_example_validation() {
    var expected = 8;

    var plaus_example1 = $("#statement5_evaluation_plausibility_value").val();
    var vivid_example1 = $("#statement5_evaluation_vividness_value").val();
    var plaus_example2 = $("#statement6_evaluation_plausibility_value").val();
    var vivid_example2 = $("#statement6_evaluation_vividness_value").val();

    if (Math.abs(plaus_example1 - expected) > 2 ||
        Math.abs(vivid_example1 - expected) > 2 ||
        Math.abs(plaus_example2 - expected) > 2 ||
        Math.abs(vivid_example2 - expected) > 2
    ) {
        wrong_evaluation();
    } else {
        well_done();
    }
}

function wrong_evaluation() {
    $('body').prepend(
        '<div id="show_example_validation">' +
        'Your evaluation was not like we expected it to be.<br>' +
        'For both examples, we expected a plausibility of 8 and a vividness of 8.<br>' +
        '<hr/>' +
        'You can now start with the main task!<br>' +
        '</div>'
    );

    simple_transition($("#statement6_wrapper"), $("#show_example_validation"));
    $("#next").attr('onclick', 'to_main_statements()');
}

function well_done() {
    $('body').prepend(
        '<div id="well_done">' +
        'Well done!<br>' +
        'Your evaluation was just as we expected it to be.<br>' +
        '<hr/>' +
        'You can now start with the main task.<br>' +
        '</div>'
    );

    simple_transition($("#statement6_wrapper"), $("#well_done"));
    $("#next").attr('onclick', 'to_main_statements()');
}

function to_main_statements() {
    $("#show_example_validation").css('display', 'none');
    $("#well_done").css('display', 'none');

    to_statement1();
}

function to_statement1() {
    data_statement1 = get_content(1);

    add_statement(1, null);

    $("#statement1_content").text(data_statement1.content);
    simple_transition($("#statement6_wrapper"), $("#statement1_wrapper"));

    $("#next").attr('onclick', 'to_statement2()');
}

function to_statement2(prev_data) {
    data_statement2 = get_content(2);

    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement1,
            evaluation: {
                plausibility: $("#statement1_evaluation_plausibility_value").val(),
                vividness: $("#statement1_evaluation_vividness_value").val(),
            }
        })

        add_statement(2, null);

        $("#statement2_content").text(data_statement2.content);
        simple_transition($("#statement1_wrapper"), $("#statement2_wrapper"));

        $("#next").attr('onclick', "to_statement3('data')");
    }
}

function to_statement3(prev_data) {
    data_statement3 = get_content(3);

    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement2,
            evaluation: {
                plausibility: $("#statement2_evaluation_plausibility_value").val(),
                vividness: $("#statement2_evaluation_vividness_value").val(),
            }
        })
        add_statement(3, null);

        $("#statement3_content").text(data_statement3.content);
        simple_transition($("#statement2_wrapper"), $("#statement3_wrapper"));
        $("#next").attr('onclick', "to_statement4('data')");
    }
}

function to_statement4(prev_data) {
    data_statement4 = get_content(4);

    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement3,
            evaluation: {
                plausibility: $("#statement3_evaluation_plausibility_value").val(),
                vividness: $("#statement3_evaluation_vividness_value").val(),
            }
        })
        add_statement(4, null);

        $("#statement4_content").text(data_statement4.content);
        simple_transition($("#statement3_wrapper"), $("#statement4_wrapper"));
        $("#next").attr('onclick', "to_transition(data)");
    }
}

function to_transition(prev_data) {

    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement4,
            evaluation: {
                plausibility: $("#statement4_evaluation_plausibility_value").val(),
                vividness: $("#statement4_evaluation_vividness_value").val(),
            }
        });
        simple_transition($("#statement4_wrapper"), $("#transition1"));
        $("#next").attr('onclick', 'to_demographics1()');
    }

}

function to_demographics1() {
    simple_transition($("#transition1"), $("#demographics1"));
    $("#next").attr('onclick', 'to_demographics2()');
    define_keys($("#age_sel"), 'number', 2);
}

function to_demographics2() {
    if (check_fields($(".select_menu")) === true) {
        if (has_second_language() === false) {
            $("#lang2").css('display', 'none');
        }
        simple_transition($("#demographics1"), $("#demographics2"));
        $("#next").attr('onclick', 'to_outro()');
    }
}

function to_outro() {
    if (check_fields($(".select_menu")) === true) {
        simple_transition($("#demographics2"), $("#outro"));
        $("#partcode").text(unid);
        // $("#next").show();

        $("#next").text('SEND');
        $("#next").attr('onclick', 'send_to_server()');
    }
}

function get_data() {
    data.ip = clientip;
    data.browsername = $.browser.name;
    data.browserversion = $.browser.version;
    data.ts_time = moment().format('LTS');
    data.ts_date = moment().format('l');
    data.unidin = $("#unidin").val();
    data.crowdf = $("#crowdf").val();
    data.gender = $("#gender_sel").val();
    data.age = $("#age_sel").val();
    data.education = $("#education_sel").val();
    data.origin = $("#origin_sel").val();
    data.bilingual_sel = $("#bilingual_sel").val();
    data.lang1_sel = $("#lang1_sel").val();
    data.lang2_sel = $("#lang2_sel").val();

    data.example1_category = data_array[0].content.category;
    data.example1_content = data_array[0].content.content;
    data.example1_plausibility = data_array[0].content.plausibility;
    data.example1_vividness = data_array[0].content.vividness;
    data.example1_type = data_array[0].content.type;
    data.example1_eval_plausibility = data_array[0].evaluation.plausibility;
    data.example1_eval_vividness = data_array[0].evaluation.vividness;

    data.example2_category = data_array[1].content.category;
    data.example2_content = data_array[1].content.content;
    data.example2_plausibility = data_array[1].content.plausibility;
    data.example2_vividness = data_array[1].content.vividness;
    data.example2_type = data_array[1].content.type;
    data.example2_eval_plausibility = data_array[1].evaluation.plausibility;
    data.example2_eval_vividness = data_array[1].evaluation.vividness;

    data.statement2_category = data_array[3].content.category;
    data.statement2_content = data_array[3].content.content;
    data.statement2_plausibility = data_array[3].content.plausibility;
    data.statement2_vividness = data_array[3].content.vividness;
    data.statement2_type = data_array[3].content.type;
    data.statement2_eval_plausibility = data_array[3].evaluation.plausibility;
    data.statement2_eval_vividness = data_array[3].evaluation.vividness;

    data.statement3_category = data_array[4].content.category;
    data.statement3_content = data_array[4].content.content;
    data.statement3_plausibility = data_array[4].content.plausibility;
    data.statement3_vividness = data_array[4].content.vividness;
    data.statement3_type = data_array[4].content.type;
    data.statement3_eval_plausibility = data_array[4].evaluation.plausibility;
    data.statement3_eval_vividness = data_array[4].evaluation.vividness;

    data.statement4_category = data_array[5].content.category;
    data.statement4_content = data_array[5].content.content;
    data.statement4_plausibility = data_array[5].content.plausibility;
    data.statement4_vividness = data_array[5].content.vividness;
    data.statement4_type = data_array[5].content.type;
    data.statement4_eval_plausibility = data_array[5].evaluation.plausibility;
    data.statement4_eval_vividness = data_array[5].evaluation.vividness;

}

