'use strict';

var async = require('async');
var path = require('path');
var jsonfile = require('jsonfile');
var _ = require('lodash');
var chakram = require('chakram');
var expect = chakram.expect;

var datsourceFolderName = "test/todos";
var apiFolderName = "test/api"
var schemaPath = "JSON Schemas/Response Schema.json";
var jsonValuePath = "JSON Schemas/Actual Response.json";
var testData = {};

//loads test scenarios for the api
function loadTestConditions(apiFolderNames, next) {

    async.each(apiFolderNames, function (apiFolder, cb) {
        var testConditionsPath = path.join(process.cwd(), apiFolderName, apiFolder, "Test Scenarios.json");

        jsonfile.readFile(testConditionsPath, function (err, testConditions) {
            if (err) {
                cb(err)
            }
            else {
                testData[apiFolder].scenarios = testConditions;
                cb(null);
            }
        })
    }, function (err) {
        if (err) {
            next(err)
        }
        else {
            next(null, apiFolderNames);
        }
    });
}

//loads the data to be used for the tests, mapped to the data in the data folder
function loadDataSource(apiFolderNames, next) {

    var data = require('../../../data/todos/todos');

    async.each(apiFolderNames, function (apiFolder, cb) {
        testData[apiFolder]["scenarios"].forEach(function (scenario) {

            scenario.data = data.todos.filter(function (a) {
                if (a["Test Scenario"] == scenario["Test Scenario"]) {
                    return a["Test Scenario"]
                }
            })
            if (scenario.data.length == 0) {
                cb("Test scenario not found -- " + scenario["Test Scenario"]);
            }
            else {
                scenario.data = scenario.data[0];
            }
        })
        cb(null);
    }, function (err) {
        if (err) {
            next(err)
        }
        else {
            next(null, apiFolderNames);
        }
    });
}

function createCustomMethods(apiFolderNames, next) {
    // A custom error method can also be added, to assert a valid error

    //custom method to assert a successful call of an API
    chakram.addMethod("success", function (responseObject, apiName, expectedOutput) {
        var responseSchema = require(path.join(process.cwd(), apiFolderName, apiName, "Expected Schema.json"));

        //Parsing the body to a json object, if it isnt one.
        if (typeof (responseObject.body) !== 'object') {
            responseObject.body = JSON.parse(responseObject.body);
        }
        
        //thes expected values can also be a url, that has the json to be expected
        expect(responseObject).to.have.schema(responseSchema);
        expect(responseObject).to.have.status(200);
        expect(responseObject).to.comprise.of.json(expectedOutput);
    });

    next(null);
}

function TestInit(apiFolderNames, next) {

    apiFolderNames.forEach(function (element) {
        testData[element] = { "scenarios": [] };
    });

    async.waterfall([
        async.apply(loadTestConditions, apiFolderNames),
        loadDataSource,
        createCustomMethods
    ], function (err) {
        if (err) {
            next(err, null);
        }
        else {
            var arrayData = Object.keys(testData).map(function (key) {
                var _apiData = {"api":key, "data":testData[key]["scenarios"]};
                return _apiData;
            });
            next(null, arrayData);
        }
    })
}

module.exports = TestInit;
