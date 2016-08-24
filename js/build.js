/**
 *
 */
function build() {
    $('body').prepend('<div id="main_wrapper"></div>');

    $('#main_wrapper').prepend(
        '<div id="header"></div>' +
        '<div id="footer"></div>' +
        '<div id="content"></div>' +
        '<div id="download_wrapper"></div>'
    );

    $('#header').prepend(
        '<div id="header_left">Anonymise me!</div>' +
        '<div id="header_right"></div>'
    );

    $('#header_right').prepend(
        '<div id="header_right_about">About</div>' +
        '<div id="header_right_source">Source Code</div>'
    );

    $("#content").prepend(
        '<div id="drop_wrapper"></div>' +
        '<div id="warning">' +
        '<div>Your input has a wrong file type!</div> ' +
        '<div>Only .txt is supported.<div></div>'
    );

    $('#drop_wrapper').prepend(
        '<div id="drop_wrapper_header">Anonymise your files .....</div>' +
        '<div id="drop_wrapper_dropbox">' +
        '<div id="drop_wrapper_dropbox_head">Drop your file(s) here!</div>' +
        '<div id="drop_wrapper_dropbox_detail">You can either drop a single file or a selection of files!</div>' +
        '</div>'
    );

    $('#drop_wrapper_dropbox').prepend(
        '<div id="choose_from_directory">' +
        '<input type="file" id="files" name="files[]" multiple />'
    );

    $("#footer").prepend(
        '<div id="footer_copyright">&copy; 2016</div>'
    );

    var download = document.createElement("a");
    download.setAttribute("id", "download");
    document.getElementById("download_wrapper").appendChild(download);
}
