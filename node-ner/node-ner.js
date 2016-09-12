var node_ner = require('node-ner');

var ner = new node_ner({
    install_path:   'stanford-ner-2014-10-26'
});

ner.fromFile('test.txt', function(entities) {
    console.log(entities);
});