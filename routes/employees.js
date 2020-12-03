const express = require("express");
const employee = require("../models/employee");
const router = express.Router();
const Employee = require("../models/employee")


router.get("/", (req,res)=>{
    Employee.find({})
    .then(employees=>{
        res.render("employeeList",{employees : employees});
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get("/employee/list", (req,res)=>{
    Employee.find({})
    .then(employees=>{
        res.render("index",{employees : employees});
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get("/employee/new", (req,res)=>{
    res.render("new");
})

router.get("/employee/search", (req,res)=>{
    res.render("search", {employee:""})
})
router.get("/employee", (req,res)=>{
    let searchQuery = {name:req.query.name}
    Employee.findOne(searchQuery)
    .then(employee =>{
        res.render("search", {employee : employee})
    })
    .catch(error =>{
        req.flash('error_msg','Error :' +err)
    })
})

router.get("/edit/:id", (req, res)=>{
    let searchQuery = {_id:req.params.id};
    Employee.findOne(searchQuery)
    .then(employee=>{
        res.render("edit", {employee : employee})
    })
    .catch(error=>{
        req.flash('error_msg','Error :' +err)
    })
})

router.post("/employee/new", (req,res)=>{
    let newEmployee = {
        name : req.body.name,
        designation : req.body.designation,
        salary : req.body.salary
    }
     Employee.create(newEmployee)
     .then(employee => {
         req.flash('success_msg', ' added successfully')
         res.redirect("/");
     })
     .catch(err=>{
        req.flash('error_msg','Error :' +err)
     })
})

//put request

router.put("/edit/:id", (req,res)=>{
    let searchQuery = {_id:req.params.id};
    Employee.updateOne(searchQuery, { $set :{
        name : req.body.name,
        designation : req.body.designation,
        salary : req.body.salary
    }})
    .then(employee=>{
        req.flash('success_msg', ' data updated successfully')
        res.redirect("/")
    })
    .catch(error=>{
        req.flash('error_msg','Error :' +err)
    })
})

// delete route
router.delete("/delete/:id", (req,res)=>{
    let searchQuery = {_id: req.params.id}
    Employee.deleteOne(searchQuery)
    .then(employee=>{
        req.flash('success_msg', ' deleted successfully')
        res.redirect('/')
    })
    .catch(error=>{
        req.flash('error_msg','Error :' +err)
        res.redirect('/')
    })
})

module.exports = router;