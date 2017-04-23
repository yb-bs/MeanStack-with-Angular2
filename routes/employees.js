var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:root@ds159330.mlab.com:59330/yorbit201_nodejs', ['emp']);
var mongoose = require('mongoose');
var EmployeeDB = mongoose.model('EmployeeDB', EmployeeDB, 'emp');

// Get All Employees
router.get('/employees', function (req, res, next) {
    EmployeeDB.find({}, function (err, employees) {
        if (err) {
            res.send(err);
        }
        res.json(employees);
    });
});

// Get Single Employee
router.get('/employee/:email', function (req, res, next) {
    EmployeeDB.findOne({ email: req.params.email }, function (err, employee) {
        if (err) {
            res.send(err);
        }
        res.json(employee);
    });
});

//Save Employee
router.post('/employee', function (req, res, next) {
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

// Delete Employee
router.delete('/employee/:email', function (req, res, next) {
    console.log("Email delete : " + req.params.email)
    EmployeeDB.findOneAndRemove({ $where: "email" == req.params.email }, function (err, employee) {
        if (err) {
            res.send(err);
        }
        res.json(employee);
    });
});

// Update Employee
router.put('/employee/:email', function (req, res, next) {
    var employee = req.body;
    var updatedEmployee = {};

    updatedEmployee.name = employee.name;
    updatedEmployee.email = employee.email;
    updatedEmployee.dob = employee.dob;
    updatedEmployee.dept = employee.dept;
    updatedEmployee.gender = employee.gender;

    if (!updatedEmployee) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        EmployeeDB.findOneAndUpdate({ email: employee.email }, updatedEmployee, { new: true }, function (err, employee) {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }
});

module.exports = router;