var express = require('express'),
    request = require('request'),
    JSONStream = require('JSONStream'),
    db = require('./db');

var app = express(),
    server = require('http').createServer(app)
    io = require('socket.io').listen(server);

var BZAPI_URL = "http://bugzilla-api.erikbryn.com/bzapi_staging";

app.use(express.static(__dirname + '/public'));

app.get('/bugs', function(req, res) {
  db.bugs.find().then(function(bugs) {
    bugs.stream().pipe(JSONStream.stringify()).pipe(res);
  })
});

app.post('/bugs', express.bodyParser(), function(req, res) {
  var params = {
    product: req.body.product,
    component: req.body.component,
    summary: req.body.summary,
    version: req.body.version || "unspecified",
    // description: null,
    op_sys: req.body.op_sys || "Mac OS",
    platform: req.body.platform || "PC",
    // priority: null,
    // severity: null,
    // alias: null,
    // assigned_to: null,
    // cc: null,
    // comment_is_private: null,
    // groups: null,
    // qa_contact: null,
    // status: null,
    // resolution: null,
    // target_milestone: null
  };

  request.post({
    url: BZAPI_URL + '/bug',
    qs: req.query,
    json: params
  }).pipe(res); // TODO: return /bugs/:bugId response instead of piping here
});

app.get('/bugs/:bugId', function(req, res) {
  db.bugs.find(req.params.bugId).then(function(bug) {
    if (!bug) { return res.send(404); }
    return res.json(bug);
  });
});

app.get('/bugs/:bugId/comments', function(req, res) {
  db.comments.find(req.params.bugId).then(function(comments) {
    comments.stream().pipe(JSONStream.stringify()).pipe(res);
  })
});

app.get('/bugs/:bugId/comments/:commentId', function(req, res) {
  var bugId = req.params.bugId,
      commentId = req.params.commentId;

  db.comments.find(bugId, commentId).then(function(comment) {
    if (!comment) { return res.send(404); }
    return res.json(comment);
  });
});

var port = process.env.PORT || 8888;
server.listen();
console.log('started server on port ' + port);
