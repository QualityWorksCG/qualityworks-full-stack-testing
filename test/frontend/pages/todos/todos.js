'use strict'

var data = require('../../../data/globals')

// Page Selectors
var elements = {
  txtTodo: { selector: '#task'},
  lstTodos: { selector: '.todo'},
  btnDelete: { selector: 'input[value="Delete"]'},
  btnEdit: { selector: 'input[value="Edit"]'}
}

var commands = {}
var user = {}

/**
 * Enter a new Todo task
 * @param {String} task Specifies what task is to be added to Todo List
 */
commands.enterTodo = function (task) {
  this.log('Inserting a new Todo')
    .waitForElementVisible('@txtTodo', 'Verify that textbox is present')
    .setValue('@txtTodo', [task, this.api.Keys.ENTER])
  return this
},

/**
 * Delete a Todo task
 * @param {int} taskNum The number for which task to delete
 */
commands.deleteTodo = function (taskNum,callback) {
  var position = taskNum + 1;
  var todoElement = elements.lstTodos.selector + ':nth-child(' + position + ')';
  var todoElementDelete = todoElement + ' ' + elements.btnDelete.selector;

  this.log('Deleting a Todo')
    .waitForElementVisible(todoElementDelete, 'Verify that delete button is present')
    .click(todoElementDelete)
  return this
},

/**
 * TODO
 * Edit a Todo task
 * @param {int} taskNum The number for which task to edit
 * @param {String} task The updated task
 */
commands.editTodo = function (taskNum,task,callback) {
  var position = taskNum + 1;
  var todoElement = elements.btnEdit.selector + ':nth-child(' + position + ')';
  var todoElementEdit = todoElement + ' ' + elements.btnEdit.selector;

  this.log('Editing a Todo')
    .waitForElementVisible(todoElementEdit, 'Verify that edit button is present')
    .click(todoElementDelete)
  return this
},


/**
 * Get a specific task from Todo List
 * @param {int} taskNum The number for which task to get
 * @return {String} task
 */
commands.getTodo = function (taskNum,callback) {
  var browser = this
  var position = taskNum + 1;
  var selectorTodos = elements.lstTodos.selector;
  var todoElement = selectorTodos + ':nth-child(' + position + ')';

  browser.log('Getting task: ' + taskNum)
         .waitForElementVisible(todoElement, 'Verify that task ' +taskNum+ ' is present')
         .getText(todoElement, function (result) {
              return callback(result.value)
        });
},

module.exports = {
  url: function () { return this.api.launch_url},
  commands: [commands],
  elements: elements
}
