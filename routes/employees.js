var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:root@ds159330.mlab.com:59330/yorbit201_nodejs', ['employees']);

// Get All Employees
router.get('/employees', function(req, res, next){
    db.employees.find(function(err, employees){
        if(err){
            res.send(err);
        }
        res.json(employees);
    });
});

// Get Single Employee
router.get('/employees/:email', function(req, res, next){
    db.employees.findOne({email: mongojs.ObjectId(req.params.id)}, function(err, employee){
        if(err){
            res.send(err);
        }
        res.json(employee);
    });
});

//Add Employee
router.post('/employees', function(req, res, next){
    var employees = req.body;
    if(!employees.title || !(employees.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.employees.save(employees, function(err, employees){
            if(err){
                res.send(err);
            }
            res.json(employees);
        });
    }
});

// Delete Employee
router.delete('/employees/:email', function(req, res, next){
    db.employees.remove({email: mongojs.ObjectId(req.params.id)}, function(err, employee){
        if(err){
            res.send(err);
        }
        res.json(employee);
    });
});

// Update Employee
router.put('/employees/:email', function(req, res, next){
    var employees = req.body;
    var updateEmployee = {};
    
    if(employees.isDone){
        updateEmployee.isDone = employees.isDone;
    }
    
    if(employees.title){
        updateEmployee.title = employees.title;
    }
    
    if(!updateEmployee){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.employees.update({email: mongojs.ObjectId(req.params.id)},updateEmployee, {}, function(err, employee){
        if(err){
            res.send(err);
        }
        res.json(employee);
    });
    }
});

module.exports = router;