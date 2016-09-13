// globals
var time_langtask1 = 90000;
var time_instr = 30000;

// task flow
$(document).ready(function() {
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

var purposes_obj = [{
        destination: 'istanbul',
        purpose: 'work',
        textstr: 'Istanbul, Turkey, for work'
    }, {
        destination: 'toronto',
        purpose: 'work',
        textstr: 'Toronto, Canada, for work'
    }, {
        destination: 'madrid',
        purpose: 'holiday',
        textstr: 'Madrid, Spain, for holiday'
    }, {
        destination: 'london',
        purpose: 'holiday',
        textstr: 'London, UK, for holiday'
    }, {
        destination: 'new dehli',
        purpose: 'visiting friends',
        textstr: 'New Delhi, India, to visit a friend'
    }, {
        destination: 'stockholm',
        purpose: 'holiday',
        textstr: 'Stockholm, Sweden, for holiday'
    }, {
        destination: 'jakarta',
        purpose: 'work',
        textstr: 'Jakarta, Indonesia, for work'
    }, {
        destination: 'copenhagen',
        purpose: 'holiday',
        textstr: 'Copenhagen, Denmark, for holiday'
    }, {
        destination: 'goa',
        purpose: 'holiday',
        textstr: 'Goa, India, for holiday'
    }, {
        destination: 'washington',
        purpose: 'visiting friends',
        textstr: 'Washington, USA, to visit a friend'
    }, {
        destination: 'paris',
        purpose: 'visiting friends',
        textstr: 'Paris, France, to visit a friend'
    }, {
        destination: 'lisbon',
        purpose: 'holiday',
        textstr: 'Lisbon, Portugal, for holiday'
    }, {
        destination: 'antalya',
        purpose: 'holiday',
        textstr: 'Antalya, Turkey, for holiday'
    }, {
        destination: 'rome',
        purpose: 'holiday',
        textstr: 'Rome, Italy, for holiday'
    }, {
        destination: 'amsterdam',
        purpose: 'visiting family',
        textstr: 'Amsterdam, The Netherlands, to visit family'
    }, {
        destination: 'bangalore',
        purpose: 'work',
        textstr: 'Bangalore, India, for work'
    }, {
        destination: 'rhodes',
        purpose: 'holiday',
        textstr: 'Rhodes, Greece, for holiday'
    }, {
        destination: 'manchester',
        purpose: 'holiday',
        textstr: 'Manchester, UK, for holiday'
    }, {
        destination: 'copenhagen',
        purpose: 'visiting friends',
        textstr: 'Copenhagen, Denmark, to visit a friend'
    }, {
        destination: 'munich',
        purpose: 'visiting family',
        textstr: 'Munich, Germany, to visit family'
    }, {
        destination: 'bogota',
        purpose: 'work',
        textstr: 'Bogota, Colombia, for work'
    }],
    selection = [],
    selected_purpose = '',
    selected_destination = '';

function to_informed_consent() {
    simple_transition($("#intro1"), $("#informed_consent"));
    $("#next").attr('onclick', 'to_flying1()');
}

function to_flying1() {
    simple_transition($("#informed_consent"), $("#flying1"));
    $("#next").attr('onclick', 'fly_flow()');
}

function to_flying2() {
    if (check_fields($(".select_menu")) === true) {
        simple_transition($("#flying1"), $("#flying2"));
        set_flying_questions($("#flying_bool_sel").val());
        // $("#next").attr('onclick', 'to_instructions1_fly()');
        $("#next").attr('onclick', 'purpose_flow()');
    }
    define_keys($("#flying_destination_sel"), 'text', 20);
    define_keys($("#flying_weeks_sel"), 'number', 3);
    define_keys($("#flying_frequency_sel"), 'number', 3);
}

function to_instructions1_fly() {
    if (check_fields($(".select_menu")) === true) {
        simple_transition($("#flying2"), $("#instructions1"));
        get_manipulation();
        get_instructions1(cond1, cond2, cond3);
        $("#next").attr('onclick', 'to_instructions2()');
    }
}

function to_instructions1_no_fly() {
    simple_transition($("#flying1"), $("#instructions1"));
    // simple_transition($("#flying1"), $("#flying2_alt"));
    get_manipulation();
    get_instructions1(cond1, cond2, cond3);
    $("#next").hide();
    $("#next").attr('onclick', 'to_instructions2()');
    setTimeout(function() {
        $("#next").show();
    }, time_instr);
}

function to_instructions2() {
    simple_transition($("#instructions1"), $("#instructions2"));
    get_instructions2(cond1, cond2, cond3);
    set_questions(cond3);
    $("#next").hide();
    $("#next").attr('onclick', 'to_q1()');
    setTimeout(function() {
        $("#next").show();
    }, time_instr);
}

function fly_flow() {
    if (check_fields($(".select_menu")) === true) {
        // to_flying2();
        is_flying();
        to_flying2();
        // if (is_flying() === true) {
        //     to_flying2();
        // } else {
        //     // to_instructions1_no_fly();
        //     to_flying2();
        // }
    }
}

function purpose_flow() {
    if (check_fields($(".select_menu")) === true) {
        // to_flying2();
        if (is_not_flying_home() === true) {
            // to_flying2();
            to_instructions1_fly();
        } else {
            // to_instructions1_no_fly();
            // to_flying2();
            to_instructions1_fly();
        }
    }
}

function is_flying() {
    if ($("#flying_bool_sel").val() == "1") {
        cond1 = randomdigit(0, 1); //Veracity
        // cond1 = 0;
        cond3 = 0;
        // return true;
    } else {
        cond1 = randomdigit(0, 1); //Veracity
        // cond1 = 0;
        cond3 = 1;
        // return false;
    }
    console.log(cond3);
}

function is_not_flying_home() {
    if ($("#flying_purpose_sel").val() == "home") {
        cond3 = 1;
        if ($("#flying_bool_sel").val() != "1") {
            cond1 = 1;
        }
        // return true;
    }
    console.log(cond3);
}


function define_manipulation(flying_bool, purpose_str, destination_str) {
    // if (flying_bool == "1") {
    $(purposes_obj).each(function() {
        if (this.destination == destination_str || this.purpose == purpose_str) {
            index_removal = $.inArray(this, purposes_obj);
            purposes_obj.splice(index_removal, 1);
        }
        selected_purposes_obj = shuffle(purposes_obj)[0];
        selected_purpose = selected_purposes_obj.purpose;
        selected_destination = selected_purposes_obj.destination;
    });
    // } else {
    //     selected_purposes_obj = shuffle(purposes_obj)[0];
    //     selected_purpose = selected_purposes_obj.purpose;
    //     selected_destination = selected_purposes_obj.destination;
    // }
    return {
        'destination': selected_destination,
        'purpose': selected_purpose
    };
}

function get_manipulation() {
    // if ($("#flying_bool_sel").val() == '1') {
        selection = define_manipulation($("#flying_bool_sel").val(), $("#flying_purpose_sel").val(), $("#flying_destination_sel").val());
    // } else {
        selection = define_manipulation($("#flying_bool_sel").val(), "-", "-");
    // }
    if (cond1 === 0) {
        selected_purpose = capitalise_string($("#flying_purpose_sel").val());
        selected_destination = capitalise_string($("#flying_destination_sel").val());
    } else if (cond1 == 1) {
        selected_purpose = capitalise_string(selection.purpose);
        selected_destination = capitalise_string(selection.destination);
    }
}

function get_instructions1(conda, condb, condc) {
    if (condc === 0) {
        if (conda === 0) {
            if (condb === 0) {
                $("#instructions1_span1").text('Your task for the following written interview is to answer questions about your upcoming trip to ' + $("#flying_destination_sel").val().toUpperCase() + ' for ' + $("#flying_purpose_sel").val().toUpperCase() + '.');
                $("#instructions1_span2").text('');
                $("#instructions1_span3").text('Please give as much information as possible when answering the questions.');
            } else if (condb == 1) {
                $("#instructions1_span1").text('Your task for the following written interview is to answer questions about your upcoming trip to ' + $("#flying_destination_sel").val().toUpperCase() + ' for ' + $("#flying_purpose_sel").val().toUpperCase() + '.');
                $("#instructions1_span2").text('');
                $("#instructions1_span3").text('Please be as specific as possible when answering the questions.');
                $("#instructions1_span4").text('Wherever possible, please give information about specifics of your trip like places, times, dates, and persons involved.');
            }
        } else if (conda == 1) {
            if (condb === 0) {
                $("#instructions1_span1").text('Your task for the following written interview is to lie on all questions about a trip you are embarking on.');
                $("#instructions1_span2").text('Specifically, your task is to pretend that you are travelling to ' + selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase() + ".");
                $("#instructions1_span3").text('Please give as much information as possible when answering the questions.');
            } else if (condb == 1) {
                $("#instructions1_span1").text('Your task for the following written interview is to lie on all questions about a trip you are embarking on.');
                $("#instructions1_span2").text('Specifically, your task is to pretend that you are travelling to ' + selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase() + ".");
                $("#instructions1_span3").text('Please be as specific as possible when answering the questions.');
                $("#instructions1_span4").text('Wherever possible, please give information about specifics of your trip like places, times, dates, and persons involved.');
            }
        }
    } else if (condc == 1) {
        if (conda === 0) {
            if (condb === 0) {
                $("#instructions1_span1").text('Your task for the following written interview is to answer questions about your last trip to ' + $("#flying_destination_sel").val().toUpperCase() + ' for ' + $("#flying_purpose_sel").val().toUpperCase() + '.');
                $("#instructions1_span2").text('');
                $("#instructions1_span3").text('Please give as much information as possible when answering the questions.');
            } else if (condb == 1) {
                $("#instructions1_span1").text('Your task for the following written interview is to answer questions about last trip to ' + $("#flying_destination_sel").val().toUpperCase() + ' for ' + $("#flying_purpose_sel").val().toUpperCase() + '.');
                $("#instructions1_span2").text('');
                $("#instructions1_span3").text('Please be as specific as possible when answering the questions.');
                $("#instructions1_span4").text('Wherever possible, please give information about specifics of your trip like places, times, dates, and persons involved.');
            }
        } else if (conda == 1) {
            if (condb === 0) {
                $("#instructions1_span1").text('Your task for the following written interview is to lie on all questions about a trip you have done.');
                $("#instructions1_span2").text('Specifically, your task is to pretend that you were travelling to ' + selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase() + ".");
                $("#instructions1_span3").text('Please give as much information as possible when answering the questions.');
            } else if (condb == 1) {
                $("#instructions1_span1").text('Your task for the following written interview is to lie on all questions about a trip you have done.');
                $("#instructions1_span2").text('Specifically, your task is to pretend that you were travelling to ' + selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase() + ".");
                $("#instructions1_span3").text('Please be as specific as possible when answering the questions.');
                $("#instructions1_span4").text('Wherever possible, please give information about specifics of your trip like places, times, dates, and persons involved.');
            }
        }
    }
    // destination = '';
    // if (cond1 === 0) {
    //     destination = $("#flying_destination_sel").val();
    // } else if (cond1 == 1) {
    //     destination = selected_destination;
    // }
}

function get_instructions2(conda, condb, condc) {
    if (condc === 0) {
        if (conda === 0) {
            if (condb === 0) {
                $("#instructions2_span1").text('answer the questions on the next pages about your trip to ' + $("#flying_destination_sel").val().toUpperCase() + ' for ' + $("#flying_purpose_sel").val().toUpperCase());
                $("#instructions2_span2").text('give as much information as possible');
                $("#instructions2_span3").text('be as convincing as possible');
                $("#instr2_span").text(selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase());
                $(".permanent_instr").text('Remember: please provide truthful answers by giving as much information as possible about your trip to ' + selected_destination + ' for ' + selected_purpose.toLowerCase());
            } else if (condb == 1) {
                $("#instructions2_span1").text('answer the questions on the next pages about your trip to ' + $("#flying_destination_sel").val().toUpperCase() + ' for ' + $("#flying_purpose_sel").val().toUpperCase());
                $("#instructions2_span2").text('make sure you provide specific information');
                $("#instructions2_span3").text('specific information are those that refer to, for example, named places or persons, dates, times, locations, streets, etc.');
                $("#instr2_span").text(selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase());
                $(".permanent_instr").text('Remember: please provide truthful answers by giving very specific information (persons, locations, times, etc.) about your trip to ' + selected_destination + ' for ' + selected_purpose.toLowerCase());
            }
        } else if (conda == 1) {
            if (condb === 0) {
                $("#instructions2_span1").text('lie on the questions on the next pages and pretend on all questions that you are travelling to ' + selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase() + ".");
                $("#instructions2_span2").text('give as much information as possible');
                $("#instructions2_span3").text('be as convincing as possible');
                $("#instr2_span").text(selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase());
                $(".permanent_instr").text('Remember: please lie about your original trip by giving as much information as possible about a trip to ' + selected_destination + ' for ' + selected_purpose.toLowerCase());
            } else if (condb == 1) {
                $("#instructions2_span1").text('lie on the questions on the next pages and pretend on all questions that you are travelling to ' + selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase() + ".");
                $("#instructions2_span2").text('make sure you provide specific information and be as convincing as possible');
                $("#instructions2_span3").text('specific information are those that refer to, for example, named places or persons, dates, times, locations, streets, etc.');
                $("#instr2_span").text(selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase());
                $(".permanent_instr").text('Remember: please lie about your original trip by giving very specific information (persons, locations, times, etc.) about a trip to ' + selected_destination + ' for ' + selected_purpose.toLowerCase());
            }
        }
    } else if (condc == 1) {
        if (conda === 0) {
            if (condb === 0) {
                $("#instructions2_span1").text('answer the questions on the next pages truthfully about your past trip to ' + $("#flying_destination_sel").val().toUpperCase() + ' for ' + $("#flying_purpose_sel").val().toUpperCase());
                $("#instructions2_span2").text('give as much information as possible');
                $("#instructions2_span3").text('be as convincing as possible');
                $("#instr2_span").text(selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase());
                $(".permanent_instr").text('Remember: please provide truthful answers by giving as much information as possible  about your trip to ' + selected_destination + ' for ' + selected_purpose.toLowerCase());
            } else if (condb == 1) {
                $("#instructions2_span1").text('answer the questions on the next pages truthfully about your past trip to ' + $("#flying_destination_sel").val().toUpperCase() + ' for ' + $("#flying_purpose_sel").val().toUpperCase());
                $("#instructions2_span2").text('make sure you provide specific information');
                $("#instructions2_span3").text('specific information are those that refer to, for example, named places or persons, dates, times, locations, streets, etc.');
                $("#instr2_span").text(selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase());
                $(".permanent_instr").text('Remember: please provide truthful answers by giving very specific information (persons, locations, times, etc.) about your trip to ' + selected_destination + ' for ' + selected_purpose.toLowerCase());
            }
        } else if (conda == 1) {
            if (condb === 0) {
                $("#instructions2_span1").text('lie on the questions on the next pages and pretend on all questions that you were travelling to ' + selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase() + ".");
                $("#instructions2_span2").text('give as much information as possible');
                $("#instructions2_span3").text('be as convincing as possible');
                $("#instr2_span").text(selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase());
                $(".permanent_instr").text('Remember: please lie about your original trip by giving as much information as possible about a trip to ' + selected_destination + ' for ' + selected_purpose.toLowerCase());
            } else if (condb == 1) {
                $("#instructions2_span1").text('lie on the questions on the next pages and pretend on all questions that you were travelling to ' + selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase() + ".");
                $("#instructions2_span2").text('make sure you provide specific information and be as convincing as possible');
                $("#instructions2_span3").text('specific information are those that refer to, for example, named places or persons, dates, times, locations, streets, etc.');
                $("#instr2_span").text(selected_destination.toUpperCase() + " for " + selected_purpose.toUpperCase());
                $(".permanent_instr").text('Remember: please lie about your original trip by giving very specific information (persons, locations, times, etc.) about a trip to ' + selected_destination + ' for ' + selected_purpose.toLowerCase());
            }
        }
    }
}

function set_questions(condc) {
    if (condc === 0) {
        $("#q1").children().eq(0).children().eq(0).text("This is a test question and a check whether you understood the instructions. Please briefly state your task in this experiment.");
        $("#q2").children().eq(0).children().eq(0).text("What is the main purpose of your flight to " + selected_destination + "?");
        $("#q3").children().eq(0).children().eq(0).text("Who will you meet in " + selected_destination + " and for which reason?");
        $("#q4").children().eq(0).children().eq(0).text("Please describe in which order you did the planning for your trip to " + selected_destination + ". What was first, what second, and what last?");
        $("#q5").children().eq(0).children().eq(0).text("What was the hardest to plan?");
        $("#q6").children().eq(0).children().eq(0).text("What is the most pleasant event you expect to happen during your trip?");
        $("#q7").children().eq(0).children().eq(0).text("What is the most unpleasant event you expect to happen during your trip?");
        $("#q8").children().eq(0).children().eq(0).text("If you have to wait during your journey, for example in the airport or changing train stations, what will you do while you're waiting?");
        $("#q9").children().eq(0).children().eq(0).text("How will you get from the airport to your accommodation?");
        $("#q10").children().eq(0).children().eq(0).text("What is the first thing you will do when you arrive at your final destination?");
        $("#q11").children().eq(0).children().eq(0).text("What is the first thing you will do when you return home from your trip to " + selected_destination + "?");
        $("#finq3").children().eq(0).children().eq(0).text("How expected was the question 'What is the main purpose of your flight?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq4").children().eq(0).children().eq(0).text("How expected was the question 'Who will you meet there and for which reason?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq5").children().eq(0).children().eq(0).text("How expected was the question 'What was first, what second, and what last in your planning?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq6").children().eq(0).children().eq(0).text("How expected was the question 'What was the hardest to plan?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq7").children().eq(0).children().eq(0).text("How expected was the question 'What is the most pleasant event you expect to happen during your trip?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq8").children().eq(0).children().eq(0).text("How expected was the question 'What is the most unpleasant event you expect to happen during your trip?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq9").children().eq(0).children().eq(0).text("How expected was the question 'What will you do if you have to wait during your journey?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq10").children().eq(0).children().eq(0).text("How expected was the question 'How will you get from the airport to your accommodation?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq11").children().eq(0).children().eq(0).text("How expected was the question 'What is the first thing you will do when you arrive at your final destination?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq12").children().eq(0).children().eq(0).text("How expected was the question 'What is the first thing you will do when you return home from your trip?', from 0 (not at all) to 10 (absolutely)?");
        $("#final_control1").children().eq(0).children().eq(0).text("Are you really flying to " + $("#flying_destination_sel").val() + " in circa " + $("#flying_weeks_sel").val() + " weeks?");
    } else if (condc == 1) {
        $("#q1").children().eq(0).children().eq(0).text("This is a test question and a check whether you understood the instructions. Please briefly state your task in this experiment.");
        $("#q2").children().eq(0).children().eq(0).text("What was the main purpose of your flight to " + selected_destination + "?");
        $("#q3").children().eq(0).children().eq(0).text("Who did you meet in " + selected_destination + " and for which reason?");
        $("#q4").children().eq(0).children().eq(0).text("Please describe in which order you did the planning for your trip to " + selected_destination + ". What was first, what second, and what last?");
        $("#q5").children().eq(0).children().eq(0).text("What was the hardest to plan?");
        $("#q6").children().eq(0).children().eq(0).text("What was the most pleasant event during your trip?");
        $("#q7").children().eq(0).children().eq(0).text("What was the most unpleasant event during your trip?");
        $("#q8").children().eq(0).children().eq(0).text("If you had to wait during your journey, for example in the airport or changing train stations, what did you do while you were waiting?");
        $("#q9").children().eq(0).children().eq(0).text("How did you get from the airport to your accommodation?");
        $("#q10").children().eq(0).children().eq(0).text("What was the first thing you did when you arrived at your final destination?");
        $("#q11").children().eq(0).children().eq(0).text("What was the first thing you did when you returned home from your trip to " + selected_destination + "?");
        $("#finq3").children().eq(0).children().eq(0).text("How expected was the question 'What was the main purpose of your flight?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq4").children().eq(0).children().eq(0).text("How expected was the question 'Who did you meet there and for which reason?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq5").children().eq(0).children().eq(0).text("How expected was the question 'What was first, what second, and what last in your planning?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq6").children().eq(0).children().eq(0).text("How expected was the question 'What was the hardest to plan?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq7").children().eq(0).children().eq(0).text("How expected was the question 'What was the most pleasant event during your trip?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq8").children().eq(0).children().eq(0).text("How expected was the question 'What was the most unpleasant event during your trip?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq9").children().eq(0).children().eq(0).text("How expected was the question 'What did you do if you had to wait during your journey?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq10").children().eq(0).children().eq(0).text("How expected was the question 'How did you get from the airport to your accommodation?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq11").children().eq(0).children().eq(0).text("How expected was the question 'What was the first thing you did when you arrived at your final destination?', from 0 (not at all) to 10 (absolutely)?");
        $("#finq12").children().eq(0).children().eq(0).text("How expected was the question 'What was the first thing you did when you returned home from your trip?', from 0 (not at all) to 10 (absolutely)?");
        $("#final_control1").children().eq(0).children().eq(0).text("Have you really been flying to " + $("#flying_destination_sel").val() + " circa " + $("#flying_weeks_sel").val() + " weeks ago?");
    }
}


function to_q1() {
    simple_transition($("#instructions2"), $("#q1"));
    q_meta_init($("#tbq1"));
    $("#next").attr('onclick', 'to_q2()');
}

function to_q2() {
    if (validate_text($("#tbq1"), 15, 'both') === true) {
        q_meta_retrieve($("#tbq1"), 'q1');
        simple_transition($("#q1"), $("#q2"));
        q_meta_init($("#tbq2"));
        $("#q2_span").text(selected_destination).css('textTransform', 'capitalize');
        $("#next").attr('onclick', 'to_q3()');
    }
}

function to_q3() {
    if (validate_text($("#tbq2"), 50, 'both') === true) {
        q_meta_retrieve($("#tbq2"), 'q2');
        simple_transition($("#q2"), $("#q3"));
        q_meta_init($("#tbq3"));
        $("#q3_span").text(selected_destination).css('textTransform', 'capitalize');
        $("#next").attr('onclick', 'to_q4()');
    }
}

function to_q4() {
    if (validate_text($("#tbq3"), 50, 'both') === true) {
        q_meta_retrieve($("#tbq3"), 'q3');
        simple_transition($("#q3"), $("#q4"));
        q_meta_init($("#tbq4"));
        $("#q4_span").text(selected_destination).css('textTransform', 'capitalize');
        $("#next").attr('onclick', 'to_q5()');
    }
}

function to_q5() {
    if (validate_text($("#tbq4"), 50, 'both') === true) {
        q_meta_retrieve($("#tbq4"), 'q4');
        simple_transition($("#q4"), $("#q5"));
        q_meta_init($("#tbq5"));
        $("#next").attr('onclick', 'to_q6()');
    }
}

function to_q6() {
    if (validate_text($("#tbq5"), 50, 'both') === true) {
        q_meta_retrieve($("#tbq5"), 'q5');
        simple_transition($("#q5"), $("#q6"));
        q_meta_init($("#tbq6"));
        $("#next").attr('onclick', 'to_q7()');
    }
}

function to_q7() {
    if (validate_text($("#tbq6"), 50, 'both') === true) {
        q_meta_retrieve($("#tbq6"), 'q6');
        simple_transition($("#q6"), $("#q7"));
        q_meta_init($("#tbq7"));
        $("#next").attr('onclick', 'to_q8()');
    }
}

function to_q8() {
    if (validate_text($("#tbq7"), 50, 'both') === true) {
        q_meta_retrieve($("#tbq7"), 'q7');
        simple_transition($("#q7"), $("#q8"));
        q_meta_init($("#tbq8"));
        $("#next").attr('onclick', 'to_q9()');
    }
}

function to_q9() {
    if (validate_text($("#tbq8"), 10, 'both') === true) {
        q_meta_retrieve($("#tbq8"), 'q8');
        simple_transition($("#q8"), $("#q9"));
        q_meta_init($("#tbq9"));
        $("#next").attr('onclick', 'to_q10()');
    }
}

function to_q10() {
    if (validate_text($("#tbq9"), 10, 'both') === true) {
        q_meta_retrieve($("#tbq9"), 'q9');
        simple_transition($("#q9"), $("#q10"));
        q_meta_init($("#tbq10"));
        $("#next").attr('onclick', 'to_q11()');
    }
}

function to_q11() {
    if (validate_text($("#tbq10"), 50, 'both') === true) {
        q_meta_retrieve($("#tbq10"), 'q10');
        simple_transition($("#q10"), $("#q11"));
        q_meta_init($("#tbq11"));
        $("#q11_span").text(selected_destination).css('textTransform', 'capitalize');
        $("#next").attr('onclick', 'to_transition()');
    }
}

function to_transition() {
    if (validate_text($("#tbq11"), 50, 'both') === true) {
        q_meta_retrieve($("#tbq11"), 'q11');
        simple_transition($("#q11"), $("#transition1"));
        // $("#next").attr('onclick', 'to_lextale1()');
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
        $("#next").attr('onclick', 'to_controls1()');
    }
}

function to_controls1() {
    if (check_fields($(".select_menu")) === true && check_slider($(".slider_io_output")) === true) {
        simple_transition($("#demographics2"), $("#control_questions1"));
        $("#next").attr('onclick', 'to_controls2()');
    }
}

function to_controls2() {
    if (check_fields($(".select_menu")) === true && check_slider($(".slider_io_output")) === true) {
        simple_transition($("#control_questions1"), $("#control_questions2"));
        $("#next").attr('onclick', 'to_controls3()');
        // define_keys($("#finq5val"), 'number', 3);
        // define_keys($("#finq6val"), 'number', 3);
        // define_keys($("#finq7val"), 'number', 3);
        // define_keys($("#finq8val"), 'number', 3);
    }
}

function to_controls3() {
    if (check_fields($(".select_menu")) === true && check_slider($(".slider_io_output")) === true) {
        simple_transition($("#control_questions2"), $("#control_questions3"));
        $("#next").attr('onclick', 'to_lextale1()');
        // define_keys($("#finq5val"), 'number', 3);
        // define_keys($("#finq6val"), 'number', 3);
        // define_keys($("#finq7val"), 'number', 3);
        // define_keys($("#finq8val"), 'number', 3);
    }
}


function has_second_language() {
    if ($("#bilingual_sel").val() == "1") {
        return true;
    } else {
        return false;
    }
}

function to_lextale1() {
    if (check_fields($(".select_menu")) === true && check_slider($(".slider_io_output")) === true) {
        simple_transition($("#control_questions3"), $("#lextale1"));
        $("#next").hide();
        init_main();
    }
    // $("#next").attr('onclick', 'to_langtask1()');
}

// function to_lextale2() {
//     simple_transition($("#lextale1"), $("#lextale2"));
//     $("#next").attr('onclick', 'to_langtask1()');
// }

function to_langtask1() {
    simple_transition($("#lextale1"), $("#langtask1"));
    $("#next").hide();
    init_language_task1($("#tbwordprod"), time_langtask1);
    $("#next").attr('onclick', 'to_final_control1()');
}

function to_final_control1() {
    simple_transition($("#langtask1"), $("#final_control1"));
    $("#next").show();
    $("#next").attr('onclick', 'to_outro()');
}

function to_outro() {
    if (check_fields($(".select_menu")) === true) {
        simple_transition($("#final_control1"), $("#outro"));
        $("#partcode").text(unid);
        // $("#next").show();
        $("#next").text('SEND');
        $("#next").attr('onclick', 'send_to_server()');
    }
}

function init_language_task1(ID, time) {
    var listen = true;
    ID.keydown(function(e) {
        if (listen === true) {
            listen = false;
            setTimeout(function() {
                to_final_control1();
            }, time);
        }
    });
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

function set_flying_questions(fly_bool) {
    if (fly_bool === '1') {
        $("#flying_weeks").children().eq(0).text("How many weeks (approx.) until your next flight?");
        $("#flying_purpose").children().eq(0).text("What is the purpose of your next flight?");
        $("#flying_destination").children().eq(0).text("What is the final destination of your next flight?");
        $("#flying_frequency").children().eq(0).text("How many times have you travelled there in the past?");
    } else {
        $("#flying_weeks").children().eq(0).text("How many weeks (approx.) ago was your last flight?");
        $("#flying_purpose").children().eq(0).text("What was the purpose of your last flight?");
        $("#flying_destination").children().eq(0).text("What was the final destination of your last flight?");
        $("#flying_frequency").children().eq(0).text("How many times have you travelled there in the past?");
    }
}
