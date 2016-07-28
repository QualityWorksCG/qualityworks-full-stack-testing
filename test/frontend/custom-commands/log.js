/*
 * @method log
 * @param {string} message The message to log to the console.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 */

var chalk = require('chalk');
var infoSymbol = String.fromCharCode('9432');

exports.command = function(message, callback) {
    var browser = this;

    browser.perform(function() {
        console.log('\n' + chalk.blue.bold(infoSymbol) + '  ' + message);
    });

    if (typeof callback === 'function') {
        callback.call(this);
    }

    return this;
};