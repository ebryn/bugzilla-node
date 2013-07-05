var http = require("http"),
    mysql = require("mysql"),
    JSONStream = require('JSONStream'),
    request = require("request"),
    url = require("url");

var server = http.createServer();
server.listen(8888);

server.on('request', function (req, res) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'bugzilla_public_20130102'
  });

  connection.connect();

  var match = req.url.match(/\/bug\/(\d+)$/),
      bugId = match && match[1];

  if (bugId) {
    var sql = 'SELECT bug_id id, alias, bug_status status, short_desc summary, p.name product, ' +
              'c.name component, version, rep_platform platform, op_sys, priority, bug_severity severity, ' +
              'assigned_to, qa_contact, creation_ts creation_time, delta_ts last_change_time ' +
              'FROM bugs b ' +
              'LEFT JOIN products p ON b.product_id = p.id ' +
              'LEFT JOIN components c ON b.component_id = c.id ' +
              'WHERE bug_id = ?'

    connection.query(sql, [bugId], function(error, result) {
      var row = result[0];
      if (!row) {
        // 404
      } else {
        res.write(JSON.stringify(row));
        res.end();
      }
    });
  } else {
    connection.
      query('SELECT bug_id id, alias, bug_status status, short_desc summary, p.name product, ' +
            'c.name component, version, rep_platform platform, op_sys, priority, bug_severity severity, ' +
            'assigned_to, qa_contact, creation_ts creation_time, delta_ts last_change_time ' +
            'FROM bugs b ' +
            'LEFT JOIN products p ON b.product_id = p.id ' +
            'LEFT JOIN components c ON b.component_id = c.id ' +
            'ORDER BY bug_id DESC LIMIT 10000').
      stream().pipe(JSONStream.stringify()).pipe(res);
  }

  connection.end();
});