'use strict';

var rewire = require('rewire');
var should = require('should');

//utilizing rewire to access internal methods
var testableCode = rewire('./Testable Code.js');
var sum = testableCode.__get__('sumNumbers');
var difference = testableCode.__get__('subtractNumbers');
var product = testableCode.__get__('multiplyNumbers');
var division = testableCode.__get__('divideNumbers');

describe("Carrying out tests on some testable code", function () {
    
    // before(function(){
    //     console.log("Done before all tests in this test suite.")
    // })

    // beforeEach(function(){
    //     console.log("Done before each test in this test suite.")
    // })
    

    it("should get the sum of 2 numbers", function () {
        sum(3, 4).should.be.exactly(7);
    })

    it("should get the difference of 2 numbers", function () {
        difference(4, 3).should.be.exactly(1);
    })

    it("should get the product of 2 numbers", function () {
        product(4, 3).should.be.exactly(12);
    })

    it("should get the division of 2 numbers", function () {
        division(6,2).should.be.exactly(3);
    })

    it("should get null when dividing by 0", function () {
        should.equal(division(4,0), null);
    })

    // after(function () {
    //     console.log("Done after all tests in this test suite.")
    // })

    // afterEach(function () {
    //     console.log("Done after each test in this test suite.")
    // })
})