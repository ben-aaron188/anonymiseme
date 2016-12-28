var string_input = "Peter went to Munich yesterday with Paul and Paul likes Peter and Munich.";
var entity = 'Peter';
// var entity_regex = new RegExp(entity.replace(/\s+/g, '\\s+'));
var entity_regex = new RegExp(entity, 'g');
var replacement = 'PERSON_1';
new_string = string_input.replace(entity_regex, replacement);
