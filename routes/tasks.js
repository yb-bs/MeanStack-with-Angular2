var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:root@ds159330.mlab.com:59330/yorbit201_nodejs', ['emp']);

// Get All Tasks
router.get('/tasks', function (req, res, next) {
    db.emp.find(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get Single Task
router.get('/task/:id', function (req, res, next) {
    db.emp.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//Save Employee
router.post('/task', function (req, res, next) {
    var employee = req.body;
    if (!employee.email) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.emp.save(employee, function (err, employee) {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }
});

// Delete Task
router.delete('/task/:email', function (req, res, next) {
    console.log("Email delete : " + req.params.email)
    db.emp.remove({ $where: "email" == req.params.email }, function (err, employee) {
        if (err) {
            res.send(err);
        }
        res.json(employee);
    });
});

// Update Task
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updTask = {};

    if (task.isDone) {
        updTask.isDone = task.isDone;
    }

    if (task.title) {
        updTask.title = task.title;
    }

    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.emp.update({ _id: mongojs.ObjectId(req.params.id) }, updTask, {}, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;