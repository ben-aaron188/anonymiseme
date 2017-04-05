// globals
var data_array = [];
<<<<<<< HEAD
var types = shuffle([0, 1, 2, 3]);
=======
// var type = Math.floor(Math.random() * 4);
var type = randomdigit(0, 3);

>>>>>>> mar10
var statement_array_proxy = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
var data_statement1;
var data_statement2;
var data_statement3;
var data_statement4;
var data_statement5;
var unid;
var repetition_count = 0;
<<<<<<< HEAD
var text_timeout = 3000;
=======
var text_timeout = 15000;
>>>>>>> mar10
var min_char = 15;
var t1;

function randomdigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// task flow
$(document).ready(function() {
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
    $('.stretch').each(function() {
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


function to_main_statements() {
    get_unid(repetition_count);
    to_statement1();
}

function to_statement1() {
<<<<<<< HEAD
    var data = get_content_2(get_type(), 0);
=======
    var data = get_sample_content();
>>>>>>> mar10
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
<<<<<<< HEAD
        var data = get_content_2(get_type(), 0);
=======
        var data = get_content_2(type);
>>>>>>> mar10
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
<<<<<<< HEAD
        var data = get_content_2(get_type(), 1);
=======
        var data = get_content_2(type);
>>>>>>> mar10
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
<<<<<<< HEAD
        var data = get_content_2(get_type(), 1);
=======
        var data = get_content_2(type);
>>>>>>> mar10
        data_statement4 = data;

        start_timer();
        add_statement(4, data_statement4[1], data_statement4[3]);
        simple_transition($("#statement3_wrapper"), $("#statement4_wrapper"));
        hide_show_next();
        $("#next").attr('onclick', 'to_statement5()');
    }
}

function to_statement5() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        statement4_elapsed = end_timer();
        data_array.push({
            content: data_statement4[0],
            category: data_statement4[0].category,
            text: data_statement4[1],
            type: data_statement4[2],
            solution: data_statement4[3].correct,
            evaluation: {
                certainty: $("#statement4_certainty").val(),
                plausibility: $("#statement4_plausibility").val(),
                readability: $("#statement4_readability").val(),
                choice: $("#statement4_input").val()
            }
        });
        pagefocus_statement4 = pagefocus_get_data();
        var data = get_content_2(type);
        data_statement5 = data;

        start_timer();
        add_statement(5, data_statement5[1], data_statement5[3]);
        simple_transition($("#statement4_wrapper"), $("#statement5_wrapper"));
        hide_show_next();
        $("#next").attr('onclick', 'to_transition()');
    }
}

function to_transition() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        statement5_elapsed = end_timer();
        data_array.push({
            content: data_statement5[0],
            text: data_statement5[1],
            category: data_statement5[0].category,
            type: data_statement5[2],
            solution: data_statement5[3].correct,
            evaluation: {
                certainty: $("#statement5_certainty").val(),
                plausibility: $("#statement5_plausibility").val(),
                readability: $("#statement5_readability").val(),
                choice: $("#statement5_input").val()
            }
        });
        var text = transition_text;
        $('body').prepend('<div id="transition1" class="text1_">' + text + '</div>');
        pagefocus_statement5 = pagefocus_get_data();
        simple_transition($("#statement5_wrapper"), $("#transition1"));
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
<<<<<<< HEAD
            'Please fill in your Prolific participant ID and the participation code displayed above (e.g. AB1234) .' +
=======
            'Please fill in your Prolific participant ID and the participation code displayed above (e.g. AB1234).</br>Click on SEND to finish the task (the submission may take some seconds).' +
>>>>>>> mar10
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
    data.statement1_name = data_array[0].content.category_str;
    data.statement1_correctoption = data_array[0].content.choices.correct;
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
    data.statement2_name = data_array[1].content.category_str;
    data.statement2_correctoption = data_array[1].content.choices.correct;
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
    data.statement3_name = data_array[2].content.category_str;
    data.statement3_correctoption = data_array[2].content.choices.correct;
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
    data.statement4_name = data_array[3].content.category_str;
    data.statement4_correctoption = data_array[3].content.choices.correct;
    data.statement4_type = data_array[3].type;
    data.statement4_certainty = data_array[3].evaluation.certainty;
    data.statement4_readability = data_array[3].evaluation.readability;
    data.statement4_plausibility = data_array[3].evaluation.plausibility;
    data.statement4_choice = data_array[3].evaluation.choice;
    data.statement4_eval_defoucus = pagefocus_statement4.defocus;
    data.statement4_eval_refoucus = pagefocus_statement4.refocus;
    data.statement4_eval_defocusduration = pagefocus_statement4.durationsum;
    data.statement4_elapsed = statement4_elapsed;

    data.statement5_category = data_array[4].category;
    data.statement5_content = data_array[4].text;
    data.statement5_id = data_array[4].content.id;
    data.statement5_name = data_array[4].content.category_str;
    data.statement5_correctoption = data_array[4].content.choices.correct;
    data.statement5_type = data_array[4].type;
    data.statement5_certainty = data_array[4].evaluation.certainty;
    data.statement5_readability = data_array[4].evaluation.readability;
    data.statement5_plausibility = data_array[4].evaluation.plausibility;
    data.statement5_choice = data_array[4].evaluation.choice;
    data.statement5_eval_defoucus = pagefocus_statement5.defocus;
    data.statement5_eval_refoucus = pagefocus_statement5.refocus;
    data.statement5_eval_defocusduration = pagefocus_statement5.durationsum;
    data.statement5_elapsed = statement5_elapsed;

    data.openquestion = $("#openquestion").val();

    console.log(data);

    return data;
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
