var mongojs = require('mongojs');
var db = mongojs('meantodo', ['todos']);

function  getDummyRecord(cb) {
    db.todos.find(function (err, data) {
        if (data.length == 0) {
            db.todos.insert({
                "todo": "Dummy Todo: Testing API",
                "isCompleted": false
            }, function (err, data) {
                db.close();
                cb(data._id);
            })
        }
        db.close()
        cb(data[0]._id);
    });
}

module.exports = getDummyRecord;