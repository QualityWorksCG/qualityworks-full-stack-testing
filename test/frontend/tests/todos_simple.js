'use strict'

var todos
var db = require('mongoose')
var data = require('../../data/todos/todos')
var db_uri = process.env.DB_URI ? process.env.DB_URI : 'mongodb://localhost/meantodo'

module.exports = {
  tags: ['simple'],
  before: function (client, done) {
    client.maximizeWindow()

    db.connect(db_uri, function () {
      /* Drop the DB */
      db.connection.db.dropDatabase()
      /* Close the DB connection*/
      db.connection.close()
      done()
    })
  },

  /* Insert records */
  'Verify that new todo/s can be created - Simple (no page objec)': function (client) {
      client
        .url('http://localhost:3000/')
        .waitForElementVisible('#task')
        .setValue('#task', ['A new todo', client.Keys.ENTER])
        .waitForElementVisible('.todo:nth-child(2)')
        .getText('.todo:nth-child(2)', function (result) {
              client.verify.equal(result.value,'A new todo')
        });
  },

  after: function (client) {
    client.end()
  }

}
