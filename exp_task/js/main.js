// globals
var data_array = [];
var data_statement1;
var data_statement2;
var data_statement3;
var data_statement4;
var data_example1;
var data_example2;
var unid;
var validation_score = 0;

// task flow
$(document).ready(function() {
    init_data();
    getIP();
    $("#intro1").show();
    $("#next").attr('onclick', 'to_informed_consent()');
});


function to_informed_consent() {
    simple_transition($("#intro1"), $("#informed_consent"));
    $("#next").attr('onclick', 'to_statement_evaluation()');
}

function activate_stretch(){
  $('.stretch').each(function(){
      $(this).stretch_text();
  });
}

function to_statement_evaluation() {
    $('body').prepend('<div id="statement_explanation">' +
        'Explanation</br>' +
        'You will now first read two example statements to test whether you correctly understood the definitions we want you to apply to the main statements.</br>' +
        'Please adhere to the following two definitions of plausibility and detailedness.</br></br>' +
        'Plausibility = the coherency of the statement in terms of not containing logical inconsistencies or contradictions.</br></br>' +
        'Detailedness = the inclusion of specific descriptions of place, time, persons, objects and events.</br></br>' +
        'After the two examples, you get feedback and will then proceed to the four main statements.</br>' +
        '</div>'
    );

    simple_transition($("#informed_consent"), $("#statement_explanation"));
    $("#next").attr('onclick', 'to_example1()');
}

function set_plaus_slider_value(number) {
    var input = "#statement" + number + "_evaluation_plausibility_value";
    var output = "#plaus_output_" + number;
    $(output).val($(input).val());
}

function set_vivid_slider_value(number) {
    var input = "#statement" + number + "_evaluation_detailedness_value";
    var output = "#vivid_output_" + number;
    $(output).val($(input).val());
}

function add_statement(number, example) {
    pagefocus_reset();
    var header;
    if (!example) {
        header = "Statement " + number + "/4";
    } else {
        header = example;
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
        '<div class="slider_io_output_labels stretch">(low) 0 - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10 (high)</div> ' +
        '</div>' +
        '</div>' +
        '<div class="statement_evaluation_slider statement_evaluation_detailedness" id="statement' + number + '_evaluation_detailedness">' +
        '<div class="slider_io">' +
        '<span id="slider_instr">detailedness</span> ' +
        '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_evaluation_detailedness_value" value="5" min="0" max="10" oninput="set_vivid_slider_value(' + number + ')">' +
        '<output class="slider_io_output" id="vivid_output_' + number + '">move the slider</output> ' +
        '<div class="slider_io_output_labels stretch">(low) 0 - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10 (high)</div> ' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    activate_stretch();
}

function to_example1() {
    data_example1 = examples[0];
    add_statement(5, "Example 1");
    $("#statement5_content").text(data_example1.content);
    simple_transition($("#statement_explanation"), $("#statement5_wrapper"));
    $("#next").attr('onclick', 'verify_example_1()');
}

function to_example2() {
    data_example2 = examples[1];
    add_statement(6, "Example 2");
    $("#statement6_content").text(data_example2.content);
    simple_transition($("#statement5_wrapper"), $("#statement6_wrapper"));
    $("#next").attr('onclick', 'verify_example_2()');
}

function verify_example_1() {
    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_example1,
            evaluation: {
                plausibility: $("#statement5_evaluation_plausibility_value").val(),
                detailedness: $("#statement5_evaluation_detailedness_value").val(),
            }
        });
        check_example_validation('example1');
    }
}

function verify_example_2() {
    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_example2,
            evaluation: {
                plausibility: $("#statement6_evaluation_plausibility_value").val(),
                detailedness: $("#statement6_evaluation_detailedness_value").val(),
            }
        });
        check_example_validation('example2');
    }
}


function check_example_validation(example_number) {
    var vivid_expected_example1 = 3;
    var plaus_expected_example1 = 8;
    var vivid_expected_example2 = 8;
    var plaus_expected_example2 = 8;
    var plaus_example1 = $("#statement5_evaluation_plausibility_value").val();
    var vivid_example1 = $("#statement5_evaluation_detailedness_value").val();
    var plaus_example2 = $("#statement6_evaluation_plausibility_value").val();
    var vivid_example2 = $("#statement6_evaluation_detailedness_value").val();
    switch (example_number) {
        case 'example1':
            if (Math.abs(plaus_example1 - plaus_expected_example1) > 2 ||
                Math.abs(vivid_example1 - vivid_expected_example1) > 2
            ) {
                validation_score++;
                wrong_evaluation(example_number, plaus_expected_example1, vivid_expected_example1);
            } else {
                well_done(example_number);
            }
            break;
        case 'example2':
            if (Math.abs(plaus_example2 - plaus_expected_example2) > 2 ||
                Math.abs(vivid_example2 - vivid_expected_example2) > 2
            ) {
                validation_score++;
                wrong_evaluation(example_number, plaus_expected_example2, vivid_expected_example2);
            } else {
                well_done(example_number);
            }
            break;
    }
    switch (example_number) {
        case 'example1':
            $("#next").attr('onclick', 'to_example2()');
            break;
        case 'example2':
            $("#next").attr('onclick', 'to_main_statements()');
            break;
    }
}

function wrong_evaluation(example_number, exp_plaus, exp_vivid) {
    var message = "Your evaluation was not correct. For this example, we expected a plausibility rating of " + exp_plaus + " and a detailedness rating of " + exp_vivid + ".";
    alert(message);
}

function well_done(example_number) {
    var message;
    switch (example_number) {
        case 'example1':
            message = "Well done. Your evaluation was just as expected. You can now proceed to the second example.";
            break;
        case 'example2':
            message = "Well done. Your evaluation was just as expected. You can now proceed to the proper task.";
            break;
    }
    alert(message);
}

function to_main_statements() {
    get_unid(validation_score);
    // $("#show_example_validation").css('display', 'none');
    // $("#well_done").css('display', 'none');
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
                detailedness: $("#statement1_evaluation_detailedness_value").val(),
            }
        });
        pagefocus_statement1 = pagefocus_get_data();
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
                detailedness: $("#statement2_evaluation_detailedness_value").val(),
            }
        });
        pagefocus_statement2 = pagefocus_get_data();
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
                detailedness: $("#statement3_evaluation_detailedness_value").val(),
            }
        });
        pagefocus_statement3 = pagefocus_get_data();
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
                detailedness: $("#statement4_evaluation_detailedness_value").val(),
            }
        });
        pagefocus_statement4 = pagefocus_get_data();
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
    data.example1_detailedness = data_array[0].content.detailedness;
    data.example1_type = data_array[0].content.type;
    data.example1_eval_plausibility = data_array[0].evaluation.plausibility;
    data.example1_eval_detailedness = data_array[0].evaluation.detailedness;

    data.example2_category = data_array[1].content.category;
    data.example2_content = data_array[1].content.content;
    data.example2_plausibility = data_array[1].content.plausibility;
    data.example2_detailedness = data_array[1].content.detailedness;
    data.example2_type = data_array[1].content.type;
    data.example2_eval_plausibility = data_array[1].evaluation.plausibility;
    data.example2_eval_detailedness = data_array[1].evaluation.detailedness;

    data.statement1_category = data_array[2].content.category;
    data.statement1_content = data_array[2].content.content;
    data.statement1_plausibility = data_array[2].content.plausibility;
    data.statement1_detailedness = data_array[2].content.detailedness;
    data.statement1_type = data_array[2].content.type;
    data.statement1_eval_plausibility = data_array[2].evaluation.plausibility;
    data.statement1_eval_detailedness = data_array[2].evaluation.detailedness;
    data.statement1_eval_defoucus = pagefocus_statement1.defocus;
    data.statement1_eval_refoucus = pagefocus_statement1.refocus;
    data.statement1_eval_defocusduration = pagefocus_statement1.durationsum;

    data.statement2_category = data_array[3].content.category;
    data.statement2_content = data_array[3].content.content;
    data.statement2_plausibility = data_array[3].content.plausibility;
    data.statement2_detailedness = data_array[3].content.detailedness;
    data.statement2_type = data_array[3].content.type;
    data.statement2_eval_plausibility = data_array[3].evaluation.plausibility;
    data.statement2_eval_detailedness = data_array[3].evaluation.detailedness;
    data.statement2_eval_defoucus = pagefocus_statement2.defocus;
    data.statement2_eval_refoucus = pagefocus_statement2.refocus;
    data.statement2_eval_defocusduration = pagefocus_statement2.durationsum;

    data.statement3_category = data_array[4].content.category;
    data.statement3_content = data_array[4].content.content;
    data.statement3_plausibility = data_array[4].content.plausibility;
    data.statement3_detailedness = data_array[4].content.detailedness;
    data.statement3_type = data_array[4].content.type;
    data.statement3_eval_plausibility = data_array[4].evaluation.plausibility;
    data.statement3_eval_detailedness = data_array[4].evaluation.detailedness;
    data.statement3_eval_defoucus = pagefocus_statement3.defocus;
    data.statement3_eval_refoucus = pagefocus_statement3.refocus;
    data.statement3_eval_defocusduration = pagefocus_statement3.durationsum;

    data.statement4_category = data_array[5].content.category;
    data.statement4_content = data_array[5].content.content;
    data.statement4_plausibility = data_array[5].content.plausibility;
    data.statement4_detailedness = data_array[5].content.detailedness;
    data.statement4_type = data_array[5].content.type;
    data.statement4_eval_plausibility = data_array[5].evaluation.plausibility;
    data.statement4_eval_detailedness = data_array[5].evaluation.detailedness;
    data.statement4_eval_defoucus = pagefocus_statement4.defocus;
    data.statement4_eval_refoucus = pagefocus_statement4.refocus;
    data.statement4_eval_defocusduration = pagefocus_statement4.durationsum;
}
