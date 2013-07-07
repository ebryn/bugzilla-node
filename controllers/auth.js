var db = require('../models/db'),
    request = require('request'),
    config = require('../config');

module.exports = {
  login: function(req, res) {
    request.post({
      url: config.BZ_INDEX_CGI,
      form: {
        Bugzilla_login: req.body.username,
        Bugzilla_password: req.body.password
      }
    }, function(err, response, body) {
      body = body || {};
      if (err) { return res.json(err.message, 500); }
      if (response.statusCode != 200) { return res.json(body, response.statusCode); }

      var token = response.headers['set-cookie'][1].match(/Bugzilla_logincookie=([^;]*)/)[1]; // yuck

      db.auth.findUserIdForToken(token).then(function(userId) {
        debugger;
        res.json({token: token, user_id: userId});
      });
    });
  }
};