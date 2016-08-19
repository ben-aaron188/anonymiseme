function map_to_array(source_obj) {
    var temp_target_array = [];
    $.map(source_obj, function(i) {
        temp_target_array.push(i.text);
    });
    return temp_target_array;
}
