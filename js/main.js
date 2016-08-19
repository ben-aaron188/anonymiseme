// simpel architecture

$(document).ready(function () {
    init();
});

function init() {
    $('body').prepend('<div id="main_wrapper"></div>');

    $('#main_wrapper').prepend('<div id="header">Anonymise me!</div>');
    $('#main_wrapper').prepend('<div id="drop_wrapper"></div>');
    $('#drop_wrapper').prepend('<div id="drop_wrapper_header">Drop your files here!</div>');
    $('#drop_wrapper').prepend('<div id="drop_wrapper_arrow">&#8595;</div>');
    $('#drop_wrapper').prepend('<div id="drop_wrapper_dropbox"></div>');

    $("#drop_wrapper_dropbox").droppable({
        drop: function (event, ui) {
            on_file_drop();
        }
    });
}

function on_file_drop() {
    // read file (txt, doc, docx) and call anonymise()
}

function anonymise(file) {
    // nlp
}

function write_file(file) {
    // write content to txt and return txt with download option
}

// input
//  formats txt, doc(x)

// processing
//  get entities for anonymisation
//  re-phrase entities


// output
//  write new downloadable text file
