var express = require('express'),
    config = require('./config'),
    bugs = require('./controllers/bugs');

var app = express(),
    server = require('http').createServer(app)
    io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/bugs', bugs.getBugs);
app.get('/bugs/:bugId', bugs.getBug);
app.post('/bugs', bugs.createBug);
app.get('/bugs/:bugId/comments', bugs.getCommentsForBug);
app.get('/bugs/:bugId/comments/:commentId', bugs.getCommentForBug);
app.post('/bugs/:bugId/comments', bugs.createCommentForBug);

server.listen(config.PORT);
console.log('started server on port ' + config.PORT);
