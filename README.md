Full Stack Testing
=============
### Overview

This project demonstrates how full-stack-testing can be leveraged on a MEAN App. 
It provides examples of how to run api,unit,frontend and performance tests. 
It utilises the following technologies:

* chakram - A REST API test framework
* mocha - A JavaScript test framework
* nightwatch.js - An End-to-End testing framework for browsers and websites 
* qualitywatcher - a reporting tool that allows you to view tests on a historical dashboard
* qualitymeter - performance testing tool that provides you with metrics for your web pages

The MEAN Todo App that is used in this project was cloned from https://github.com/arvindr21/MEAN-Todo-App.

### Install & Run Application
```
$ git clone https://github.com/QualityWorksCG/qualityworks-full-stack-testing.git
$ cd qualityworks-full-stack-testing
$ npm install
$ npm run gulp
```
Navigate to `http://localhost:3000` to view the app.

_*Ensure Mongodb is running and JAVA is installed*_

### Automation

* Run tests (This will run unit, api & frontend tests locally)
    * `npm test` _This command will start and stop the app automatically_

* Individual test commands

        Unit Tests     - npm run test:unit

        API Tests      - npm run test:api

        Frontend Tests - npm run test:frontend

* Run tests and see reports on [qualitywatcher.io](http://qualitywatcher.io/) dashboard
    * See [qualitywatcher](https://github.com/QualityWorksCG/qualitywatcher) node mdoule for setup

    _If you need to see these results on your own qualitywatcher.io dashboard, 
    please fork this 
    [bitbucket project](https://bitbucket.org/QualityWorks-CG/qualityworks-full-stack-testing). 
    Sign up/in to [qualitywatcher.io](http://qualitywatcher.io/) and add 
    the project to your watchlist. Ensure that the *.qualitywatcher.yml* in the project is updated with your own
    repo token._

* Run performance test (The generated html can be found in ./test/performance)
    * `npm run performance`
    
 ___
### Use Sauce Labs
* Launch Sauce Connect Tunnel
    *	Download correct sauce connect zip folder from (https://wiki.saucelabs.com/display/DOCS/Setting+Up+Sauce+Connect)
    *	Extract compressed folder
    *	Navigate to the extracted folder via command line/prompt

    After you have navigated to the sauce connect folder, run the command:
    
    `bin\sc -u “Your_Username” - k “Your_Access Key”`. 
    
    User will input the username of the sauce labs account that will be used, as well as the access key which can be found in the user settings section of sauce labs.

* Run Test on Sauce Labs
    * `npm run sauce`