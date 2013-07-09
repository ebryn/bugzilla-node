var RSVP = require('rsvp'),
    db = require('../models/db'),
    request = require('request'),
    JSONStream = require('JSONStream'),
    config = require('../config');

module.exports = {
  getComment: function(req, res) {
    var commentId = req.params.commentId;

    db.comments.findById(commentId).then(function(comment) {
      if (!comment) { return res.send(404); }
      return res.json(comment);
    });
  }
};