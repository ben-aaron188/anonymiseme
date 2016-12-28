// String.prototype.replaceAll = function(str1, str2, ignore) {
//     return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
// };

var parent_string = "Steven Paul Steve Jobs (February 24, 1955 – October 5, 2011) was an American information technology entrepreneur and inventor who worked with Steve Wozniak.";

var entities = {
    PERSON: ['Steven Paul Steve Jobs',
        'Steve Wozniak'
    ],
    DATE: ['February 24, 1955',
        'October 5, 2011'
    ]
};
// Need to fix blank space after currency sign in entities

var replacement = 'REPLACED';

// var string_as_array = parent_string.match(/\b(\w+)\b/g);

$.each(entities, function(key, value) {
    $.each(this, function(index, val) {
        console.log(val);
        tester = parent_string.indexOf(val);
        console.log(tester);
        // var re = new RegExp(val);
        var re = new RegExp(val.replace(/\s+/g, '\\s+'));
        parent_string = parent_string.replace(re, replacement);
    });
    console.log(parent_string);
});


// option1: take parent string from variable.
// option2: send entities to js and take from there.


// $.each(entities, function(key, value) {
//     $.each(this, function(index, val) {
//         console.log(val);
//         tester = $.inArray(val, string_as_array);
//         if (tester !== -1) {
//             string_as_array[index] = replacement;
//         }
//         console.log(tester);
//         // var re = new RegExp(val, "gi");
//         // var re = new RegExp(val);
//         // parent_string = parent_string.replace(re, replacement);
//         // console.log(val, replacement);
//     });
//     // console.log(parent_string);
// });
