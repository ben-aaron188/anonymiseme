// globals
var time_langtask1 = 90000;
var time_instr = 30000;

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

    return statement.content;
}

function to_informed_consent() {
    simple_transition($("#intro1"), $("#informed_consent"));
    $("#next").attr('onclick', 'to_statement_evaluation()');
}

function to_statement_evaluation() {
    $('body').prepend('<div id="statement_explanation">Explanation here?</div>');

    simple_transition($("#informed_consent"), $("#statement_explanation"));
    $("#next").attr('onclick', 'to_statement1()');
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

function add_statement(number) {
    $('body').prepend(
        '<div class="statement_wrapper" id="statement' + number + '_wrapper">' +
        '<div class="statement_header" id="statement' + number + '_header">Statement ' + number + '/4</div>' +
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

function to_statement1() {
    add_statement(1);

    $("#statement1_content").text(get_content(1));
    simple_transition($("#statement_explanation"), $("#statement1_wrapper"));
    $("#next").attr('onclick', 'to_statement2()');
}

function to_statement2() {
    add_statement(2);

    $("#statement2_content").text(get_content(2));
    simple_transition($("#statement1_wrapper"), $("#statement2_wrapper"));
    $("#next").attr('onclick', 'to_statement3()');
}

function to_statement3() {
    add_statement(3);

    $("#statement3_content").text(get_content(3));
    simple_transition($("#statement2_wrapper"), $("#statement3_wrapper"));
    $("#next").attr('onclick', 'to_statement4()');
}

function to_statement4() {
    add_statement(4);

    $("#statement4_content").text(get_content(4));
    simple_transition($("#statement3_wrapper"), $("#statement4_wrapper"));
    $("#next").attr('onclick', 'to_transition()');
}

function to_transition() {
    simple_transition($("#statement4_wrapper"), $("#transition1"));
    $("#next").attr('onclick', 'to_demographics1()');
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
    data.contact = $("#contact").val();
    data.unidin = $("#unidin").val();
    data.crowdf = $("#crowdf").val();
    data.flying_bool_sel = $("#flying_bool_sel").val();
    data.flying_weeks_sel = $("#flying_weeks_sel").val();
    data.flying_purpose_sel = $("#flying_purpose_sel").val();
    data.flying_destination_sel = $("#flying_destination_sel").val();
    data.flying_purpose_manip = selected_purpose;
    data.flying_destination_manip = selected_destination;
    data.flying_frequency_sel = $("#flying_frequency_sel").val();
    data.q1_text = $("#tbq1").val();
    data.q1_length = q1_length;
    data.q1_deletions = q1_deletions;
    data.q1_elapsed = q1_elapsed;
    data.q1_gaps_100 = q1_gaps_100;
    data.q1_gaps_200 = q1_gaps_200;
    data.q1_gaps_300 = q1_gaps_300;
    data.q2_text = $("#tbq2").val();
    data.q2_length = q2_length;
    data.q2_deletions = q2_deletions;
    data.q2_elapsed = q2_elapsed;
    data.q2_gaps_100 = q2_gaps_100;
    data.q2_gaps_200 = q2_gaps_200;
    data.q2_gaps_300 = q2_gaps_300;
    data.q3_text = $("#tbq3").val();
    data.q3_length = q3_length;
    data.q3_deletions = q3_deletions;
    data.q3_elapsed = q3_elapsed;
    data.q3_gaps_100 = q3_gaps_100;
    data.q3_gaps_200 = q3_gaps_200;
    data.q3_gaps_300 = q3_gaps_300;
    data.q4_text = $("#tbq4").val();
    data.q4_length = q4_length;
    data.q4_deletions = q4_deletions;
    data.q4_elapsed = q4_elapsed;
    data.q4_gaps_100 = q4_gaps_100;
    data.q4_gaps_200 = q4_gaps_200;
    data.q4_gaps_300 = q4_gaps_300;
    data.q5_text = $("#tbq5").val();
    data.q5_length = q5_length;
    data.q5_deletions = q5_deletions;
    data.q5_elapsed = q5_elapsed;
    data.q5_gaps_100 = q5_gaps_100;
    data.q5_gaps_200 = q5_gaps_200;
    data.q5_gaps_300 = q5_gaps_300;
    data.q6_text = $("#tbq6").val();
    data.q6_length = q6_length;
    data.q6_deletions = q6_deletions;
    data.q6_elapsed = q6_elapsed;
    data.q6_gaps_100 = q6_gaps_100;
    data.q6_gaps_200 = q6_gaps_200;
    data.q6_gaps_300 = q6_gaps_300;
    data.q7_text = $("#tbq7").val();
    data.q7_length = q7_length;
    data.q7_deletions = q7_deletions;
    data.q7_elapsed = q7_elapsed;
    data.q7_gaps_100 = q7_gaps_100;
    data.q7_gaps_200 = q7_gaps_200;
    data.q7_gaps_300 = q7_gaps_300;
    data.q8_text = $("#tbq8").val();
    data.q8_length = q8_length;
    data.q8_deletions = q8_deletions;
    data.q8_elapsed = q8_elapsed;
    data.q8_gaps_100 = q8_gaps_100;
    data.q8_gaps_200 = q8_gaps_200;
    data.q8_gaps_300 = q8_gaps_300;
    data.q9_text = $("#tbq9").val();
    data.q9_length = q9_length;
    data.q9_deletions = q9_deletions;
    data.q9_elapsed = q9_elapsed;
    data.q9_gaps_100 = q9_gaps_100;
    data.q9_gaps_200 = q9_gaps_200;
    data.q9_gaps_300 = q9_gaps_300;
    data.q10_text = $("#tbq10").val();
    data.q10_length = q10_length;
    data.q10_deletions = q10_deletions;
    data.q10_elapsed = q10_elapsed;
    data.q10_gaps_100 = q10_gaps_100;
    data.q10_gaps_200 = q10_gaps_200;
    data.q10_gaps_300 = q10_gaps_300;
    data.q11_text = $("#tbq11").val();
    data.q11_length = q11_length;
    data.q11_deletions = q11_deletions;
    data.q11_elapsed = q11_elapsed;
    data.q11_gaps_100 = q11_gaps_100;
    data.q11_gaps_200 = q11_gaps_200;
    data.q11_gaps_300 = q11_gaps_300;
    data.gender = $("#gender_sel").val();
    data.age = $("#age_sel").val();
    data.education = $("#education_sel").val();
    data.origin = $("#origin_sel").val();
    data.bilingual_sel = $("#bilingual_sel").val();
    data.lang1_sel = $("#lang1_sel").val();
    data.lang2_sel = $("#lang2_sel").val();
    data.langprof1_sel = $("#langprof1_sel").val();
    data.langprof2_sel = $("#langprof2_sel").val();
    data.finq1val = $("#finq1val").val();
    data.finq2val = $("#finq2val").val();
    data.finq3val = $("#finq3val").val();
    data.finq4val = $("#finq4val").val();
    data.finq5val = $("#finq5val").val();
    data.finq6val = $("#finq6val").val();
    data.finq7val = $("#finq7val").val();
    data.finq8val = $("#finq8val").val();
    data.finq9val = $("#finq9val").val();
    data.finq10val = $("#finq10val").val();
    data.finq11val = $("#finq11val").val();
    data.finq12val = $("#finq12val").val();
    // lextale comes automatically
    data.tbwordprod = $("#tbwordprod").val();
    data.cond1 = cond1;
    data.cond2 = cond2;
    // data.cond2_control = cond2_control;
    data.cond3 = cond3;
    data.control = $("#final_control1_val").val();
}

