var node_ner = require('node-ner');
var fs = require('fs');
var encoding = require("encoding");
var Replacer = null;
var Util = null;
var ner = new node_ner({
    install_path: './libs/node_ner/stanford-ner-2014-10-26'
});

/**
 * Replaces all the recognised entities within a given text.
 *
 * @param {String} entities The recognised entities
 */
replace_entities = function() {
    var organizations = [],
        locations = [],
        persons = [],
        dates = [],
        entity_arr = [],
        replaced = [];

    fs.readFile("text_example.txt", "ascii", function(err, data) {
        if (err) {
            throw err;
        }
        data = data.toString('ascii', 0, data.length);

        // $.each(entities, function( key, value ) {
        //   alert( key + ": " + value );
        // });

      });
};

      //   for (var property in entities) {
      //       if (entities[property]) {
      //           for (var i = 0; i < entities[property].length; i++) {
      //               var entity = entities[property][i],
      //                   replacement = null;
      //
      //               if (property == 'MONEY') {
      //                   entity = NER.adjust_currency(entity);
      //               }
      //
      //               if (complete) {
      //                   replacement = _Util().get_term_beginning(entity) + "XXX" + _Util().get_term_terminator(entity);
      //               } else {
      //                   replacement = NER.get_replacement(property, entity, complete, replaced);
      //                   replaced.push(replacement);
      //
      //                   if (property == 'ORGANIZATION') {
      //                       organizations.push(replacement);
      //                   } else if (property == 'LOCATION') {
      //                       locations.push(replacement);
      //                   } else if (property == 'PERSON') {
      //
      //                       var res = _Replacer().smart_name_rep(data, entity, replacement);
      //                       data = res.data;
      //
      //                       if (res.entities) {
      //                           for (var i = 0; i < res.entities.length; i++) {
      //                               entity_arr.push(res.entities[i]);
      //                           }
      //
      //                           persons.push(res.re_last);
      //                       }
      //
      //                       persons.push(replacement);
      //                   } else if (property == "DATE") {
      //                       dates.push(replacement);
      //                   }
      //               }
      //
      //               if (data.indexOf(entity) != -1) {
      //                   // console.log(entity, property);
      //                   // console.log(data.indexOf(entity));
      //                   entity_arr.push(entity);
      //                   // console.log(entity === Array);
      //                   // console.log(entity === String);
      //                   console.log(typeof entity);
      //                   // console.log(encoding.convert(entity, 'ascii') == entity);
      //                   // console.log(entity, property);
      //                   // console.log(encodeURIComponent(entity) == entity);
      //               } else if ((data.indexOf(entity) == -1) && (entity_arr.indexOf(entity) == -1)) {
      //                   // console.log(entity, property);
      //                   // console.log(data.indexOf(entity));
      //               }
      //               data = data.replace(new RegExp(entity, 'gi'), replacement);
      //           }
      //       }
      //   }
      // }
