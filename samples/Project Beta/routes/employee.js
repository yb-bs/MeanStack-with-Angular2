var mongoose = require( 'mongoose' );
var employees = mongoose.model( 'Employees' );

exports.index=function(req,res){
                  res.render('index',{session:req.session});
              }

exports.newEmployee=function(req,res){
   var name=req.body.name;
   var email=req.body.email;
   var dob=req.body.dob;
   var dept=req.body.dept;
   var gender=req.body.gender;

   var employee=new Employees();
   employee.name=name;
   employee.email=email;
   employee.dob=dob;
   employee.dept=dept;
   employee.gender=gender;

   employee.save(function(err){
       if(err) throw err;
       console.log("Employee saved successfully.")
   });
   employees.find({}, function(err,employees){
        res.render('index',{employees:employees,session:req.session});
   });
}

