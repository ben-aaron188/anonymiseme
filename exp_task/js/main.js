// globals
var data_array = [];
var types = shuffle([0, 1, 2, 3]);
var data_statement1;
var data_statement2;
var data_statement3;
var data_statement4;
var unid;
var repetition_count = 0;
var text_timeout = 3000;
var min_char = 10;
var t1;

// task flow
$(document).ready(function () {
    init_data();
    getIP();
    $("#intro1").show();
    var text = intro_text;
    $('body').prepend('<div id="intro1" class="text1">' + text + '</div>');
    $("#next").attr('onclick', 'to_informed_consent()');
});


function to_informed_consent() {
    simple_transition($("#intro1"), $("#informed_consent"));
    $("#next").attr('onclick', 'to_statement_evaluation()');
}

function activate_stretch() {
    $('.stretch').each(function () {
        $(this).stretch_text();
    });
}

function to_statement_evaluation() {
    var text = main_explanation;
    $('body').prepend('<div id="statement_explanation">' +
        text +
        '</div>'
    );
    simple_transition($("#informed_consent"), $("#statement_explanation"));
    $("#next").attr('onclick', 'to_main_statements()');
    // to statement
}

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
            '<span id="slider_instr">How readable do you find this text (in %)?</span> ' +
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


function to_main_statements() {
    get_unid(repetition_count);
    to_statement1();
}

function to_statement1() {
    var data = get_content(get_type(), 0);
    data_statement1 = data;
    start_timer();

    add_statement(1, data_statement1[1], data_statement1[3]);
    simple_transition($("#statement_explanation"), $("#statement1_wrapper"));
    hide_show_next();
    $("#next").attr('onclick', 'to_statement2()');
}

function to_statement2() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        statement1_elapsed = end_timer();
        data_array.push({
            content: data_statement1[0],
            category: data_statement1[0].category,
            text: data_statement1[1],
            type: data_statement1[2],
            solution: data_statement1[3].correct,
            evaluation: {
                certainty: $("#statement1_certainty").val(),
                plausibility: $("#statement1_plausibility").val(),
                readability: $("#statement1_readability").val(),
                choice: $("#statement1_input").val()
            }
        });
        pagefocus_statement1 = pagefocus_get_data();
        var data = get_content(get_type(), 0);
        data_statement2 = data;

        start_timer();
        add_statement(2, data_statement2[1], data_statement2[3]);
        simple_transition($("#statement1_wrapper"), $("#statement2_wrapper"));
        hide_show_next();
        $("#next").attr('onclick', 'to_statement3()');
    }
}

function to_statement3() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        statement2_elapsed = end_timer();
        data_array.push({
            content: data_statement2[0],
            category: data_statement2[0].category,
            text: data_statement2[1],
            type: data_statement2[2],
            solution: data_statement2[3].correct,
            evaluation: {
                certainty: $("#statement2_certainty").val(),
                plausibility: $("#statement2_plausibility").val(),
                readability: $("#statement2_readability").val(),
                choice: $("#statement2_input").val()
            }
        });
        pagefocus_statement2 = pagefocus_get_data();
        var data = get_content(get_type(), 1);
        data_statement3 = data;

        start_timer();
        add_statement(3, data_statement3[1], data_statement3[3]);
        simple_transition($("#statement2_wrapper"), $("#statement3_wrapper"));
        hide_show_next();
        $("#next").attr('onclick', 'to_statement4()');
    }
}

function to_statement4() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        statement3_elapsed = end_timer();
        data_array.push({
            content: data_statement3[0],
            category: data_statement3[0].category,
            text: data_statement3[1],
            type: data_statement3[2],
            solution: data_statement3[3].correct,
            evaluation: {
                certainty: $("#statement3_certainty").val(),
                plausibility: $("#statement3_plausibility").val(),
                readability: $("#statement3_readability").val(),
                choice: $("#statement3_input").val()
            }
        });
        pagefocus_statement3 = pagefocus_get_data();
        var data = get_content(get_type(), 1);
        data_statement4 = data;

        start_timer();
        add_statement(4, data_statement4[1], data_statement4[3]);
        simple_transition($("#statement3_wrapper"), $("#statement4_wrapper"));
        hide_show_next();
        $("#next").attr('onclick', 'to_transition()');
    }
}

function to_transition() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        statement4_elapsed = end_timer();
        data_array.push({
            content: data_statement4[0],
            text: data_statement4[1],
            category: data_statement4[0].category,
            type: data_statement4[2],
            solution: data_statement4[3].correct,
            evaluation: {
                certainty: $("#statement4_certainty").val(),
                plausibility: $("#statement4_plausibility").val(),
                readability: $("#statement4_readability").val(),
                choice: $("#statement4_input").val()
            }
        });
        var text = transition_text;
        $('body').prepend('<div id="transition1" class="text1_">' + text + '</div>');
        pagefocus_statement4 = pagefocus_get_data();
        simple_transition($("#statement4_wrapper"), $("#transition1"));
        $("#next").attr('onclick', 'to_open_questions()');
    }
}

function to_open_questions() {
    var text = open_question_text;
    var input_field = '<span id="text_input1_instr">' + text + '</span> ' +
        '<textarea type="text" class="open_question_input" id="openquestion" placehoder="Type your answer here"></textarea>';
    $('body').prepend('<div id="open_question" class="text1_">' + input_field + '</div>');
    simple_transition($("#transition1"), $("#open_question"));
    $("#next").attr('onclick', 'to_demographics1()');
}

function to_demographics1() {
    if (check_input($("#openquestion"), min_char) === true) {
        simple_transition($("#open_question"), $("#demographics1"));
        $("#next").attr('onclick', 'to_demographics2()');
        define_keys($("#age_sel"), 'number', 2);
    }
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
        unblock_copy_pasting();
        var outro_dom = 'Your participation code: <span id=partcode style="color: red">9871NO</span></br></br>' +
            '<span id="debr">' + debriefing_long + '</span></br></br>' +
            'Please fill in your Prolific participant ID and the participation code displayed above (e.g. AB1234) .' +
            '<input type="text" id="crowdf" name="crowdf" class="select_menu" maxlength="40" size="24" style="text-align: center; left: 30%; top: 85%; height: 10%; width: 25%;" placeholder="YOUR PROLIFIC ID">' +
            '<input type="text" id="unidin" name="unidin" class="select_menu" maxlength="6" size="16" style="text-align: center; left: 70%; top: 85%; height: 10%; width: 25%; color: red" placeholder="PARTICIPATION CODE">';
        var credits_dom = '<div id="credits">' +
            'University of Amsterdam // Bennett Kleinberg: <a href="mailto:b.a.r.kleinberg@uva.nl?Subject=Online%20Experiment" target="_top">b.a.r.kleinberg@uva.nl</a>' +
            '</div>';
        $('body').prepend('<div id="outro" class="text1">' + outro_dom + '</div>' + credits_dom);
        simple_transition($("#demographics2"), $("#outro"));
        $("#partcode").text(unid);
        // $("#next").show();
        $("#next").text('SEND');
        $("#next").attr('onclick', 'send_to_server()');
    }
}


function get_data() {
    var data = {};

    data.ip = clientip;
    data.browsername = $.browser.name;
    data.browserversion = $.browser.version;
    data.ts_time = moment().format('LTS');
    data.ts_date = moment().format('l');
    data.unid = unid;
    data.unidin = $("#unidin").val();
    data.crowdf = $("#crowdf").val();
    data.gender = $("#gender_sel").val();
    data.age = $("#age_sel").val();
    data.education = $("#education_sel").val();
    data.origin = $("#origin_sel").val();
    data.bilingual_sel = $("#bilingual_sel").val();
    data.lang1_sel = $("#lang1_sel").val();
    data.lang2_sel = $("#lang2_sel").val();

    data.statement1_category = data_array[0].category;
    data.statement1_id = data_array[0].content.id;
    data.statement1_content = data_array[0].text;
    data.statement1_name = data_array[0].content.name;
    data.statement1_type = data_array[0].type;
    data.statement1_certainty = data_array[0].evaluation.certainty;
    data.statement1_readability = data_array[0].evaluation.readability;
    data.statement1_plausibility = data_array[0].evaluation.plausibility;
    data.statement1_choice = data_array[0].evaluation.choice;
    data.statement1_eval_defoucus = pagefocus_statement1.defocus;
    data.statement1_eval_refoucus = pagefocus_statement1.refocus;
    data.statement1_eval_defocusduration = pagefocus_statement1.durationsum;
    data.statement1_elapsed = statement1_elapsed;

    data.statement2_category = data_array[1].category;
    data.statement2_content = data_array[1].text;
    data.statement2_id = data_array[1].content.id;
    data.statement2_name = data_array[1].content.name;
    data.statement2_type = data_array[1].type;
    data.statement2_certainty = data_array[1].evaluation.certainty;
    data.statement2_readability = data_array[1].evaluation.readability;
    data.statement2_plausibility = data_array[1].evaluation.plausibility;
    data.statement2_choice = data_array[1].evaluation.choice;
    data.statement2_eval_defoucus = pagefocus_statement2.defocus;
    data.statement2_eval_refoucus = pagefocus_statement2.refocus;
    data.statement2_eval_defocusduration = pagefocus_statement2.durationsum;
    data.statement2_elapsed = statement2_elapsed;

    data.statement3_category = data_array[2].category;
    data.statement3_content = data_array[2].text;
    data.statement3_id = data_array[2].content.id;
    data.statement3_name = data_array[2].content.name;
    data.statement3_type = data_array[2].type;
    data.statement3_certainty = data_array[2].evaluation.certainty;
    data.statement3_readability = data_array[2].evaluation.readability;
    data.statement3_plausibility = data_array[2].evaluation.plausibility;
    data.statement3_choice = data_array[2].evaluation.choice;
    data.statement3_eval_defoucus = pagefocus_statement3.defocus;
    data.statement3_eval_refoucus = pagefocus_statement3.refocus;
    data.statement3_eval_defocusduration = pagefocus_statement3.durationsum;
    data.statement3_elapsed = statement3_elapsed;

    data.statement4_category = data_array[3].category;
    data.statement4_content = data_array[3].text;
    data.statement4_id = data_array[3].content.id;
    data.statement4_name = data_array[3].content.name;
    data.statement4_type = data_array[3].type;
    data.statement4_certainty = data_array[3].evaluation.certainty;
    data.statement4_readability = data_array[3].evaluation.readability;
    data.statement4_plausibility = data_array[3].evaluation.plausibility;
    data.statement4_choice = data_array[3].evaluation.choice;
    data.statement4_eval_defoucus = pagefocus_statement4.defocus;
    data.statement4_eval_refoucus = pagefocus_statement4.refocus;
    data.statement4_eval_defocusduration = pagefocus_statement4.durationsum;
    data.statement4_elapsed = statement4_elapsed;

    data.openquestion = $("#openquestion").val();

    console.log(data);

    return data;
}

function hide_show_next() {
    $("#next").hide();
    setTimeout(function () {
        $("#next").show();
    }, text_timeout);
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

function start_timer() {
    t1 = now();
}

function end_timer() {
    var t2 = now();
    var elapsed = t2 - t1;
    return elapsed;
}
