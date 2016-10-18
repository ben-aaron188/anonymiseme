// globals
var data_array = [];
// var types = shuffle([0, 1, 2, 3]);
var types = [0, 1, 2, 3];
var data_statement1;
var data_statement2;
var data_statement3;
var data_statement4;
var unid;
var validation_score = 0;
var repetition_count = 0;
var text_timeout = 3000;


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

function activate_stretch() {
    $('.stretch').each(function() {
        $(this).stretch_text();
    });
}

function to_statement_evaluation() {
    $('body').prepend('<div id="statement_explanation">' +
        'Explanation</br>' +
        'You will now read descriptions of persons and cities - one at a time. Your task is to identify the person or city that is described without looking up any information. Some data have been anonymised so the descriptions differ in difficulty. Please do your best to correctly identify the person or city.</br>' +
        'Please take your time with each description. You can only proceed with the task after a set time to give you enough time to carefully read the descriptions. Again, it is important that you think carefully who/what the texts describe since sometimes it takes considerable effort and people find it difficult to identify the person or city.</br></br>' +
        'If you do not adhere to the instructions, you will have to start the task again and we may have to invalidate you participation for this task.</br>' +
        '</br>You will now start with the first of four descriptions. Good luck with identifying the person or city.' +
        '</div>'
    );
    simple_transition($("#informed_consent"), $("#statement_explanation"));
    $("#next").attr('onclick', 'to_main_statements()');
    // to statement
}

function add_statement(number, content, category) {
    var header = "Description " + number + "/4";
    if (!$('#statement' + number + '_wrapper').length) {
        pagefocus_reset();
        $('body').prepend(
            // more info!!
            '<div class="statement_wrapper" id="statement' + number + '_wrapper">' +
            '<div class="statement_header" id="statement' + number + '_header">' + header +
            '</div>' +
            '<div class="statement_content" id="statement' + number + '_content">' + content +
            '</div>' +
            '<div class="text_input1">' +
            '<span id="text_input1_instr">Do you recognize this ' + category + '?</br>' +
            'If you have an idea which ' + category + ' this text describes, please write down the name.</br>' +
            'It is important that you do not look up any information.' +
            '</span> ' +
            '<input type="text" class="text_input1_text" id="statement' + number + '_input" placehoder="your answer">' +
            '<div class="slider_io">' +
            '<span id="slider_instr">How certain are you of your choice (in %)?</span> ' +
            '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_certainty" value="50" min="0" max="100" step="5" oninput="set_certainty_slider_value(' + number + ')">' +
            '<output class="slider_io_output" id="certainty_output_' + number + '">move the slider</output> ' +
            '</div>' +
            '<div class="slider_io">' +
            '<span id="slider_instr">How readable do you find this text (in %)?</span> ' +
            '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_readability" value="50" min="0" max="100" step="5" oninput="set_readability_slider_value(' + number + ')">' +
            '<output class="slider_io_output" id="readability_output_' + number + '">move the slider</output> ' +
            '</div>' +
            '<div class="slider_io">' +
            '<span id="slider_instr">How plausible do you find this text (in %)?</span> ' +
            '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_plausibility" value="50" min="0" max="100" step="5" oninput="set_plausibility_slider_value(' + number + ')">' +
            '<output class="slider_io_output" id="plausibility_output_' + number + '">move the slider</output> ' +
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
    add_statement(1, data[1], data_statement1[0].category_str);
    simple_transition($("#statement_explanation"), $("#statement1_wrapper"));
    hide_show_next();
    $("#next").attr('onclick', 'to_statement2()');
}

function to_statement2() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement1[0],
            text: data_statement1[1],
            type: data_statement1[2],
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
        add_statement(2, data[1], data_statement2[0].category_str);
        simple_transition($("#statement1_wrapper"), $("#statement2_wrapper"));
        hide_show_next();
        $("#next").attr('onclick', 'to_statement3()');
    }
}

function to_statement3() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement2[0],
            text: data_statement2[1],
            type: data_statement2[2],
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
        add_statement(3, data[1], data_statement3[0].category_str);
        simple_transition($("#statement2_wrapper"), $("#statement3_wrapper"));
        hide_show_next();
        $("#next").attr('onclick', 'to_statement4()');
    }
}

function to_statement4() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement3[0],
            text: data_statement3[1],
            type: data_statement3[2],
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
        add_statement(4, data[1], data_statement4[0].category_str);
        simple_transition($("#statement3_wrapper"), $("#statement4_wrapper"));
        hide_show_next();
        $("#next").attr('onclick', 'to_transition()');
    }
}

function to_transition() {
    if (check_choice($(".text_input1_text")) && check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement4[0],
            text: data_statement4[1],
            type: data_statement4[2],
            evaluation: {
                certainty: $("#statement4_certainty").val(),
                plausibility: $("#statement4_plausibility").val(),
                readability: $("#statement4_readability").val(),
                choice: $("#statement4_input").val()
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

    data.statement1_category = data_array[0].content.category;
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

    data.statement2_category = data_array[1].content.category;
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

    data.statement3_category = data_array[2].content.category;
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

    data.statement4_category = data_array[3].content.category;
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

    console.log(data);

    return data;
}

function hide_show_next() {
    $("#next").hide();
    setTimeout(function() {
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
