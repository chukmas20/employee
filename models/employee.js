const mongoose = require("mongoose");

let employeeSchema = new mongoose.Schema({
   name :{type:String, required:true} ,
   designation :{type:String, required:true},
   salary : {type:Number, required:true},

})


module.exports = mongoose.model('Employee', employeeSchema);