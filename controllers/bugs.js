var db = require('../models/db'),
    request = require('request'),
    JSONStream = require('JSONStream'),
    config = require('../config');

module.exports = {
  getBugs: function(req, res) {
    db.bugs.find().then(function(bugs) {
      bugs.stream().pipe(JSONStream.stringify()).pipe(res);
    });
  },

  getBug: function(req, res) {
    db.bugs.find(req.params.bugId).then(function(bug) {
      if (!bug) { return res.send(404); }
      return res.json(bug);
    });
  },

  createBug: function(req, res) {
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
      url: config.BZ_REST_ENDPOINT + 'bug',
      qs: req.query,
      json: params
    }, function(err, response, body) {
      body = body || {};
      if (err) { return res.json(err.message, 500); }
      if (response.statusCode != 200) { return res.json(body, response.statusCode); }

      params.id = body.id;
      res.json(params);
    });
  },

  getCommentsForBug: function(req, res) {
    db.comments.find(req.params.bugId).then(function(comments) {
      comments.stream().pipe(JSONStream.stringify()).pipe(res);
    });
  },

  getCommentForBug: function(req, res) {
    var bugId = req.params.bugId,
        commentId = req.params.commentId;

    db.comments.find(bugId, commentId).then(function(comment) {
      if (!comment) { return res.send(404); }
      return res.json(comment);
    });
  },

  createCommentForBug: function(req, res) {
    var bugId = req.params.bugId,
        comment = req.body,
        url;

    url = config.BZ_REST_ENDPOINT + 'bug/' + bugId + '/comment';
    request.post({
      url: url,
      json: comment,
      qs: req.query
    }, function(err, response, body) {
      if (err) { return res.json(err.message, 500); }
      if (response.statusCode != 201) { return res.json(body || {}, response.statusCode); }
      comment.id = body.id;
      res.json(comment);
    });
  }
};
