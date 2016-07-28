'use strict'

var todos
var db = require('mongoose')
var data = require('../../data/todos/todos')
var db_uri = process.env.DB_URI ? process.env.DB_URI : 'mongodb://localhost/meantodo'

module.exports = {
  before: function (client, done) {
    client.maximizeWindow()

    db.connect(db_uri, function () {
      /* Drop the DB */
      db.connection.db.dropDatabase()
      /* Close the DB connection*/
      db.connection.close()
      
      /* Load Page Object*/
      todos = client.page.todos()
      todos.navigate()
      done()

    })
  },

  /* Insert records */
  'Verify that new todo/s can be created': function (client) {
    data.todos.forEach(function(task, i){
      todos.enterTodo(task.input)
          .getTodo((i+1), function (liveTask) {
                client.pause(5000);
                client.verify.equal(liveTask, task.input)
          })
    })
  },

  'Verify that a task can be deleted': function (client) {
    todos.deleteTodo(2)
          .getTodo(2, function (task) {
                client.pause(5000);
                client.verify.equal(data.todos[2].input, task)
          })
  },

  after: function (client) {
    client.end()
  }

}
