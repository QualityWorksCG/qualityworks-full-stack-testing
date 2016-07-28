'use strict';

var fileExists = require('file-exists');
var path = require('path');
var fs = require('fs');
var chakram = require('chakram');
var expect = chakram.expect;
var dataDriver = require('data-driven');
var async = require('async');
var path = require('path');

var testInit = require('./lib/utils/TestSetup');
var testData = [];

//this hook is responsible for parsing the command line args
//and loading the correct data for the correct APIs
before(function (next) {
    var _args = process.argv;
    var apisToTest = _parseCommandArgs(_args);

    if (apisToTest == null || apisToTest.length < 1) {
        console.log("No valid apis to test.")
        process.exit(1);
    } else {
        // at this point we have valid folder paths of the APIs we want to test
        // so all we now do is call testInit, with the correct paremeters and 
        // that will load the relevant data for the APIs we will test.

        // For more complex APIs, a custom runner can be created to handle any
        // API specifc requirements.

        testInit(apisToTest, function (err, results) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                testData = results;
                next();
            }
        })
    }
})

it("Should test APIs", function () {

    describe('', function () {
        dataDriver(testData, function () {
            it("{api}", function (scenarios) {
                scenarios.data.forEach(function (scenario) {
                    sendRequest(scenarios.api, scenario);
                });
            })
        })
    })
})

function sendRequest(api, scenario) {
    describe("", function () {
        it(scenario["Test Scenario"], function () {
            var formData = {
                todo: scenario.data.body.todo,
                isCompleted: scenario.data.body.isCompleted
            }

            return chakram.request(scenario.type, scenario.url, { body: formData }, { json: false }).then(function (responseObject) {
                //Schema/Value Assertion
                expect(responseObject).to.be.a.success(api, scenario.data.body);
            })
        })
    })
}
// responsible for parse the command line arguments and returning an 
// array of valid api folders to test
function _parseCommandArgs(_args) {
    var apiFolders = [];
    //if the last argument is --all or -a, we run  all API tests
    if (_args[3] && (_args[3] === '--all' || _args[3] === '--a')) {

        //iterate through all API folders
        apiFolders = fs.readdirSync(path.join(__dirname)).filter(function (_path) {
            //once the folder we find is not the lib, we return to construct the
            //relevant API data
            if (_path != 'lib') {
                if (fs.lstatSync(path.join(__dirname, _path)).isDirectory()) {
                    return path.join(__dirname, _path);
                }
            }
        })
    } else if (_args[3] && (_args[3] === '--apis')) { //otherwise, we run the apis that were listed, split by commas
        var _apis = _args[4].split(',');


        apiFolders = _apis.filter(function (api) {
            try {
                if (fs.lstatSync(path.join(__dirname, api)).isDirectory()) {
                    return path.join(__dirname, api);
                }
            }
            catch (e) {
                console.log("Invalid API folder name: " + api);
            }
        })
    } else {
        console.log("No API name provided.");
        apiFolders = null;
    }

    return apiFolders;
}
