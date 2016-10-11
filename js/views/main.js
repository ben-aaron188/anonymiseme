// ------------------------------------
// @author: b.a.r.kleinberg@uva.nl
// ------------------------------------

/**
 *
 */
$(document).ready(function () {

    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
    }

    build();

    document.getElementById('drop_wrapper_dropbox').addEventListener('dragover', drag_handler, false);
    document.getElementById('drop_wrapper_dropbox').addEventListener('drop', drop_handler, false);
    document.getElementById('files').addEventListener('change', choose_from_dir, false);
    document.addEventListener("dragleave", drag_leave, false);
});

/**
 *
 * @param event
 */
function drop_handler(event) {
    drag_leave();

    event.stopPropagation();
    event.preventDefault();

    read_files(event.dataTransfer.files);
}

/**
 *
 * @param event
 */
function choose_from_dir(event) {
    read_files(event.target.files);
}

/**
 *
 */
function drag_leave() {
    $('#drop_wrapper_dropbox').removeClass("on_drag");
}

/**
 *
 * @param files
 */
function read_files(files) {

    var contents = [];
    var count = 0;
    var file_amount = files.length;

    for (var i = 0, f; f = files[i]; i++) {

        var reader = new FileReader();

        reader.onload = (function (file) {
            return function (e) {

                if (file.type != "text/plain") {
                    warning();
                } else {
                    contents.push([file.name, e]);
                    count++;

                    if (count == file_amount) {
                        manage_anon(contents);
                    }
                }

            };
        })(f);

        reader.readAsText(f);
    }
}

/**
 *
 * @param event
 */
function drag_handler(event) {
    event.stopPropagation();
    event.preventDefault();
    //event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

    $('#drop_wrapper_dropbox').addClass("on_drag");
}

/**
 *
 * @param files
 */
function manage_anon(files) {

    if (files.length == 1) {
        var file_string = files[0][1].currentTarget.result;
        var replaced = replace1_all(preprocess_string(file_string));

        return_modified(cut_name(files[0][0]), new Blob([replaced], {type: "text/plain"}), "File");
    } else {
        var zip = new JSZip();
        for (var i = 0; i < files.length; i++) {
            var file_string = files[i][1].currentTarget.result;
            var replaced = replace1_all(preprocess_string(file_string));

            zip.file(cut_name(files[i][0]), replaced);
        }
        zip.generateAsync({type: "blob"})
            .then(function (blob) {
                return_modified("anonymised", blob, "Zip");
            });
    }
}

/**
 *
 * @param file_name
 * @returns {string}
 */
function cut_name(file_name) {
    return file_name.substring(0, file_name.indexOf(".txt")) + "_anonymised.txt"
}

/**
 *
 * @param content
 */
function return_modified(file_name, blob, download_type) {
    var download_url = window.URL.createObjectURL(blob);
    var download = document.getElementById('download');

    download.download = file_name;
    download.text = "Download " + download_type;
    download.href = download_url;

    $("#warning").css("display", "none");
    $("#download").css("display", "block");
}

/**
 *
 */
function warning() {

    $("#download").css("display", "none");
    $("#warning").css("display", "block");

    setTimeout(function () {
        $("#warning").css("display", "none");
    }, 5000);
}

