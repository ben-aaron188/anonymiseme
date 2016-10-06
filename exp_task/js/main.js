// globals
var data_array = [];
var data_statement1;
var data_statement2;
var data_statement3;
var data_statement4;
var unid;
var validation_score = 0;
var repetition_count = 0;

// task flow
$(document).ready(function () {
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
    $('.stretch').each(function () {
        $(this).stretch_text();
    });
}

function to_statement_evaluation() {
    $('body').prepend('<div id="statement_explanation">' +
        'Explanation</br>' +
        'You will now read descriptions of persons and cities - one at a time. Your task is to identify the person or city that is described without looking up any information. Please do your best to correctly identify the person or city.</br>' +
        'Please take your time with each description. You can only proceed with the task after a set time to ensure that you can take sufficient time.</br></br>' +
        'If you do not adhere to the instructions, you will have to start the task again.</br>' +
        '</div>'
    );
    simple_transition($("#informed_consent"), $("#statement_explanation"));
    $("#next").attr('onclick', 'manage_questions()');
        // to statement
}

// function set_plaus_slider_value(number) {
//     var input = "#statement" + number + "_evaluation_plausibility_value";
//     var output = "#plaus_output_" + number;
//     $(output).val($(input).val());
// }
//
// function set_vivid_slider_value(number) {
//     var input = "#statement" + number + "_evaluation_detailedness_value";
//     var output = "#vivid_output_" + number;
//     $(output).val($(input).val());
// }
//
// function set_syntactic_accuracy_slider_value(number) {
//     var input = "#statement" + number + "_evaluation_syntactic_accuracy_value";
//     var output = "#syntactic_accuracy_output_" + number;
//     $(output).val($(input).val());
// }
//
// function set_readability_slider_value(number) {
//     var input = "#statement" + number + "_evaluation_readability_value";
//     var output = "#readability_output_" + number;
//     $(output).val($(input).val());
// }
//
// function set_meaningfulness_slider_value(number) {
//     var input = "#statement" + number + "_evaluation_meaningfulness_value";
//     var output = "#meaningfulness_output_" + number;
//     $(output).val($(input).val());
// }
//
// function set_quality_slider_value(number) {
//     var input = "#statement" + number + "_evaluation_quality_value";
//     var output = "#quality_output_" + number;
//     $(output).val($(input).val());
// }
//
// function generate_test_question(number) {
//     var header = "Question " + number + "/6";
//
//     if (!$('#question' + number + '_wrapper').length) {
//         pagefocus_reset();
//
//         $('body').prepend(
//             '<div class="question_wrapper" id="question' + number + '_wrapper">' +
//             '<div class="question_header" id="question' + number + '_header">' + header + '</div>' +
//             '<div class="question_definition" id="question' + number + '_definition"></div>' +
//             '<div class="question_option" id="question' + number + '_option1"  style="top: 45%;">' +
//             '<div class="question_option_text" id="question' + number + '_option1_text"></div>' +
//             '<div class="question_option_checkbox" id="question' + number + '_option1_checkbox">' +
//             '<input type="checkbox" name="vehicle" id="checkbox_option1">' +
//             '</div>' +
//             '</div>' +
//             '<div class="question_option" id="question' + number + '_option2" style="top: 59%;">' +
//             '<div class="question_option_text" id="question' + number + '_option2_text"></div>' +
//             '<div class="question_option_checkbox" id="question' + number + '_option2_checkbox">' +
//             '<input type="checkbox" name="vehicle" id="checkbox_option2">' +
//             '</div>' +
//             '</div>' +
//             '<div class="question_option" id="question' + number + '_option3"  style="top: 73%;">' +
//             '<div class="question_option_text" id="question' + number + '_option3_text"></div>' +
//             '<div class="question_option_checkbox" id="question' + number + '_option3_checkbox">' +
//             '<input type="checkbox" name="vehicle" id="checkbox_option3">' +
//             '</div>' +
//             '</div>' +
//             '<div class="question_option" id="question' + number + '_option4"  style="top: 87%;">' +
//             '<div class="question_option_text" id="question' + number + '_option4_text"></div>' +
//             '<div class="question_option_checkbox" id="question' + number + '_option4_checkbox">' +
//             '<input type="checkbox" name="vehicle" id="checkbox_option4">' +
//             '</div>' +
//             '</div>'
//         );
//         fill_test_questions(number);
//         activate_stretch();
//     }
// }

function add_statement(number, content) {
    var header = "Description " + number + "/4";
    if (!$('#statement' + number + '_wrapper').length) {
        pagefocus_reset();
        $('body').prepend(
          // more info!!
            '<div class="statement_wrapper" id="statement' + number + '_wrapper">' +
            '<div class="statement_header" id="statement' + number + '_header">' + header + '</div>' +
            '<div class="statement_content" id="statement' + number + '_content">' + content + '</div>' +
            // '<div class="statement_evaluation" id="statement' + number + '_evaluation">' +
            // '<div class="statement_evaluation_slider" id="statement' + number + '_evaluation_plausibility">' +
            // '<div class="slider_io">' +
            // '<span id="slider_instr">Plausibility</span> ' +
            // '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_evaluation_plausibility_value" value="4" min="1" max="7" oninput="set_plaus_slider_value(' + number + ')">' +
            // '<output class="slider_io_output" id="plaus_output_' + number + '">move the slider</output> ' +
            // '<div class="slider_io_output_labels stretch">(low) - - - - (high)</div> ' +
            // '</div>' +
            // '</div>' +
            // '<div class="statement_evaluation_slider statement_evaluation_detailedness" id="statement' + number + '_evaluation_detailedness">' +
            // '<div class="slider_io">' +
            // '<span id="slider_instr">Detailedness</span> ' +
            // '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_evaluation_detailedness_value" value="4" min="1" max="7" oninput="set_vivid_slider_value(' + number + ')">' +
            // '<output class="slider_io_output" id="vivid_output_' + number + '">move the slider</output> ' +
            // '<div class="slider_io_output_labels stretch">(low) - - - - (high)</div> ' +
            // '</div>' +
            // '</div>' +
            // '<div class="statement_evaluation_slider statement_evaluation_syntactic_accuracy" id="statement' + number + '_evaluation_syntactic_accuracy">' +
            // '<div class="slider_io">' +
            // '<span id="slider_instr">Syntactic Accuracy</span> ' +
            // '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_evaluation_syntactic_accuracy_value" value="4" min="1" max="7" oninput="set_syntactic_accuracy_slider_value(' + number + ')">' +
            // '<output class="slider_io_output" id="syntactic_accuracy_output_' + number + '">move the slider</output> ' +
            // '<div class="slider_io_output_labels stretch">(low) - - - - (high)</div> ' +
            // '</div>' +
            // '</div>' +
            // '<div class="statement_evaluation_slider statement_evaluation_readability" id="statement' + number + '_evaluation_readability">' +
            // '<div class="slider_io">' +
            // '<span id="slider_instr">Readability</span> ' +
            // '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_evaluation_readability_value" value="4" min="1" max="7" oninput="set_readability_slider_value(' + number + ')">' +
            // '<output class="slider_io_output" id="readability_output_' + number + '">move the slider</output> ' +
            // '<div class="slider_io_output_labels stretch">(low) - - - - (high)</div> ' +
            // '</div>' +
            // '</div>' +
            // '<div class="statement_evaluation_slider statement_evaluation_meaningfulness" id="statement' + number + '_evaluation_meaningfulness">' +
            // '<div class="slider_io">' +
            // '<span id="slider_instr">Meaningfulness</span> ' +
            // '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_evaluation_meaningfulness_value" value="4" min="1" max="7" oninput="set_meaningfulness_slider_value(' + number + ')">' +
            // '<output class="slider_io_output" id="meaningfulness_output_' + number + '">move the slider</output> ' +
            // '<div class="slider_io_output_labels stretch">(low) - - - - (high)</div> ' +
            // '</div>' +
            // '</div>' +
            // '<div class="statement_evaluation_slider statement_evaluation_quality" id="statement' + number + '_evaluation_quality">' +
            // '<div class="slider_io">' +
            '<span id="slider_instr">Overall Text Quality</span> ' +
            // person/city identification
            '<input type="range" class="slider_io_slider select_menu" id="statement' + number + '_evaluation_quality_value" value="4" min="1" max="7" oninput="set_quality_slider_value(' + number + ')">' +
            '<output class="slider_io_output" id="quality_output_' + number + '">move the slider</output> ' +
            '<div class="slider_io_output_labels stretch">(low) - - - - (high)</div> ' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        // activate_stretch();
        fill_test_questions(number);
    }
}

// function get_test_data(number) {
//     var data = questions[number - 1];
//     var options = [data.optiona, data.optionb, data.optionc, data.optiond];
//
//     data.optiona = options[Math.floor(Math.random() * options.length)];
//     options.splice(options.indexOf(data.optiona), 1);
//     data.optionb = options[Math.floor(Math.random() * options.length)];
//     options.splice(options.indexOf(data.optionb), 1);
//     data.optionc = options[Math.floor(Math.random() * options.length)];
//     options.splice(options.indexOf(data.optionc), 1);
//     data.optiond = options[0];
//
//     return data;
// }

// function fill_test_questions(number) {
//     var data = get_test_data(number);
//
//     $("#question" + number + "_definition").html(data.question);
//     $("#question" + number + "_option1_text").text(data.optiona);
//     $("#question" + number + "_option2_text").text(data.optionb);
//     $("#question" + number + "_option3_text").text(data.optionc);
//     $("#question" + number + "_option4_text").text(data.optiond);
// }

// function get_result(number) {
//     return get_test_data(number).answer;
// }

// var count = 1,
//     limit = 5;
// function manage_questions() {
//     var checked_box = 0;
//     var result = get_result(count);
//
//     $('#next').prop('onclick', null).off('click');
//     generate_test_question(count);
//
//     if (count == 1) {
//         simple_transition($("#statement_explanation"), $("#question1_wrapper"));
//     } else {
//         simple_transition($("#question" + (count - 1) + "_wrapper"), $("#question" + count + "_wrapper"));
//     }
//
//     $(".question_option_checkbox").click(function (e) {
//         for (var i = 1; i <= 4; i++) {
//             if (document.getElementById("checkbox_option" + i).checked) {
//                 checked_box = i;
//                 break;
//             }
//         }
//     });
//
//     $("#next").click(function () {
//         $("#next").unbind('click');
//
//         if (several_selected()) {
//             alert("You cannot choose more than one answer!");
//             document.getElementById("checkbox_option" + checked_box).checked = false;
//             manage_questions();
//         } else if (checked_box === 0) {
//             alert("You have to choose one answer! You have to repeat the task.");
//             manage_questions();
//         } else {
//             var answer = $("#question" + count + "_option" + checked_box + "_text").text();
//
//             if (answer == result) {
//                 if (count < limit) {
//                     count++;
//                     manage_questions();
//                 } else {
//                     show_last_question();
//                 }
//             } else {
//                 alert("Wrong answer! You have to repeat the task.");
//                 repetition_count++;
//                 reset_task();
//             }
//         }
//     });
// }
//
// function show_last_question() {
//     $('body').prepend(
//         '<div class="special_question" id="question' + (limit + 1) + '_wrapper">' +
//         get_test_data(limit + 1).question +
//         '</br></br>You can now start with the main task.' +
//         '</div>'
//     );
//
//     simple_transition($("#question" + limit + "_wrapper"), $("#question" + (limit + 1) + "_wrapper"));
//
//     $("#next").attr('onclick', 'to_main_statements()');
// }
//
// function several_selected() {
//     var count = 0;
//
//     for (var i = 1; i <= 4; i++) {
//         if (document.getElementById("checkbox_option" + i).checked) {
//             count++;
//         }
//     }
//
//     return count > 1;
// }
//
// function reset_task() {
//     count = 1;
//
//     $("div").remove(".question_wrapper");
//     init_data();
//     simple_transition($("#question" + (count - 1) + "_wrapper"), $("#intro"));
//     $("#next").attr('onclick', 'to_informed_consent()');
// }

function to_main_statements() {
    get_unid(repetition_count);
    to_statement1();
}

function to_statement1() {
    get_content(0, function (data) {
        data_statement1 = data;
        add_statement(1, data_statement1.content);
    });
    simple_transition($(".special_question"), $("#statement1_wrapper"));
    $("#next").attr('onclick', 'to_statement2()');
}

function to_statement2() {
    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement1,
            statementid: data_statement1.id,
            evaluation: {
                identified: $("#statement1_identified").val(),
                choice: $("#statement1_choice").val()
            }
        });
        pagefocus_statement1 = pagefocus_get_data();

        get_content(1, function (data) {
            data_statement2 = data;

            add_statement(2, data_statement2.content);
        });

        simple_transition($("#statement1_wrapper"), $("#statement2_wrapper"));
        $("#next").attr('onclick', 'to_statement3()');
    }
}

function to_statement3() {
    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement2,
            statementid: data_statement2.id,
            evaluation: {
                identified: $("#statement2_identified").val(),
                choice: $("#statement2_choice").val()
            }
        });
        pagefocus_statement2 = pagefocus_get_data();
        get_content(2, function (data) {
            data_statement3 = data;
            add_statement(3, data_statement3.content);
        });
        simple_transition($("#statement2_wrapper"), $("#statement3_wrapper"));
        $("#next").attr('onclick', 'to_statement4()');
    }
}

function to_statement4() {
    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement3,
            statementid: data_statement3.id,
            evaluation: {
                identified: $("#statement3_identified").val(),
                choice: $("#statement3_choice").val()
            }
        });
        pagefocus_statement3 = pagefocus_get_data();
        get_content(3, function (data) {
            data_statement4 = data;
            add_statement(4, data_statement4.content);
        });
        simple_transition($("#statement3_wrapper"), $("#statement4_wrapper"));
        $("#next").attr('onclick', 'to_transition()');
    }
}

function to_transition() {
    if (check_slider($(".slider_io_output"))) {
        data_array.push({
            content: data_statement4,
            statementid: data_statement4.id,
            evaluation: {
                identified: $("#statement4_identified").val(),
                choice: $("#statement4_choice").val()
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
    data.statement1_content = data_array[0].content.content;
    data.statement1_id = data_array[0].content.id;
    data.statement1_type = data_array[0].content.type;
    data.statement1_identified = data_array[0].evaluation.identified;
    data.statement1_choice = data_array[0].evaluation.choice;
    data.statement1_eval_defoucus = pagefocus_statement1.defocus;
    data.statement1_eval_refoucus = pagefocus_statement1.refocus;
    data.statement1_eval_defocusduration = pagefocus_statement1.durationsum;

    data.statement2_category = data_array[1].content.category;
    data.statement2_content = data_array[1].content.content;
    data.statement2_id = data_array[1].content.id;
    data.statement2_type = data_array[1].content.type;
    data.statement2_identified = data_array[1].evaluation.identified;
    data.statement2_choice = data_array[1].evaluation.choice;
    data.statement2_eval_defoucus = pagefocus_statement2.defocus;
    data.statement2_eval_refoucus = pagefocus_statement2.refocus;
    data.statement2_eval_defocusduration = pagefocus_statement2.durationsum;

    data.statement3_category = data_array[2].content.category;
    data.statement3_content = data_array[2].content.content;
    data.statement3_id = data_array[2].content.id;
    data.statement3_type = data_array[2].content.type;
    data.statement3_identified = data_array[2].evaluation.identified;
    data.statement3_choice = data_array[2].evaluation.choice;
    data.statement3_eval_defoucus = pagefocus_statement3.defocus;
    data.statement3_eval_refoucus = pagefocus_statement3.refocus;
    data.statement3_eval_defocusduration = pagefocus_statement3.durationsum;

    data.statement4_category = data_array[3].content.category;
    data.statement4_content = data_array[3].content.content;
    data.statement4_id = data_array[3].content.id;
    data.statement4_type = data_array[3].content.type;
    data.statement4_identified = data_array[3].evaluation.identified;
    data.statement4_choice = data_array[3].evaluation.choice;
    data.statement4_eval_defoucus = pagefocus_statement4.defocus;
    data.statement4_eval_refoucus = pagefocus_statement4.refocus;
    data.statement4_eval_defocusduration = pagefocus_statement4.durationsum;

    console.log(data);
}
