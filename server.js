var express = require('express'),
    mysql = require("mysql"),
    JSONStream = require('JSONStream'),
    db = require('./db');

var server = express();

server.get('/bugs', function(req, res) {
  db.bugs.find().then(function(bugs) {
    bugs.stream().pipe(JSONStream.stringify()).pipe(res);
  })
});

server.get('/bugs/:bugId', function(req, res) {
  db.bugs.find(req.params.bugId).then(function(bug) {
    if (!bug) { return res.send(404); }
    return res.json(bug);
  });
});

server.get('/bugs/:bugId/comments', function(req, res) {
  db.comments.find(req.params.bugId).then(function(comments) {
    comments.stream().pipe(JSONStream.stringify()).pipe(res);
  })
});

server.get('/bugs/:bugId/comments/:commentId', function(req, res) {
  var bugId = req.params.bugId,
      commentId = req.params.commentId;

  db.comments.find(bugId, commentId).then(function(comment) {
    if (!comment) { return res.send(404); }
    return res.json(comment);
  });
});

server.listen(8888);
console.log('started yo');
