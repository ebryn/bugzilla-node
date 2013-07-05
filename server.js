var express = require('express'),
    mysql = require("mysql"),
    JSONStream = require('JSONStream'),
    sql = require('./sql');

var server = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password :  process.env.BUGZILLA_PASSWORD || '',
  database : 'bugzilla_public_20130102'
});

connection.connect();

server.get('/bug', function(req, res) {
  connection.
    query(sql.bugs.findAll).
    stream().pipe(JSONStream.stringify()).pipe(res);
});

server.get('/bug/:bugId', function(req, res) {
  var bugId = req.params.bugId;

  connection.query(sql.bugs.find, [bugId], function(error, result) {
    var row = result[0];
    if (!row) { return res.send(404); }

    return res.json(row);
  });
});

server.listen(8888);
console.log('started yo');
