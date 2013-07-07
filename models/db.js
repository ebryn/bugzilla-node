var RSVP = require('rsvp'),
    mysql = require("mysql"),
    sql = require('./sql'),
    config = require('../config'),
    connection;

function connect() {
  if (connection) { return connection; }

  connection = mysql.createConnection({
    host     : config.BZ_DB_HOST,
    user     : config.BZ_DB_USER,
    password : config.BZ_DB_PASSWORD,
    database : config.BZ_DB_NAME
  });

  connection.connect();

  return connection;
}

exports.bugs = {
  find: function(id) {
    return id ? this.findById(id) : this.findAll();
  },

  findById: function(id) {
    return new RSVP.Promise(function(resolve, reject){
      var connection = connect();
      connection.query(sql.bugs.find, [id], function(error, result) {
        if (error) { return reject(error); }
        resolve(result[0]);
      });
    });
  },

  findAll: function() {
    return new RSVP.Promise(function(resolve, reject) {
      var connection = connect();
      // TODO: better way to do this?
      resolve(connection.query(sql.bugs.findAll));
    });
  }
};

exports.comments = {
  find: function(bugId, id) {
    return id ? this.findById(bugId, id) : this.findAll(bugId);
  },

  findById: function(bugId, id) {
    return new RSVP.Promise(function(resolve, reject){
      var connection = connect();
      connection.query(sql.comments.find, [bugId, id], function(error, result) {
        if (error) { return reject(error); }
        resolve(result[0]);
      });
    });
  },

  findAll: function(bugId) {
    return new RSVP.Promise(function(resolve, reject) {
      var connection = connect();
      // TODO: better way to do this?
      resolve(connection.query(sql.comments.findAll, [bugId]));
    });
  }
};
