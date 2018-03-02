/**
 * Created by javondavis on 3/2/18.
 */
const run = require('autocannon/lib/run');

function load_testing(url) {
    var arguments =
        {'url': url,
         'connections': 10};
    // autocannon.start(arguments)

    const tracker = run(arguments);
    tracker.on('done', function (result) {
        if (arguments) {
            console.log(JSON.stringify(result))
        }
    });

    tracker.on('error', function (err) {
        if (err) {
            throw err
        }
    })
}

load_testing('http://localhost:3000');