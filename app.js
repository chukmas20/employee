const express = require("express");
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const employeeRoute = require("./routes/employees");
const methodOverride = require("method-override");
const session = require("express-session")
const flash = require("connect-flash")

dotenv.config({path : "./config.env"})
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(methodOverride('_method'))

app.use(session({
  secret :"nodejs",
  resave : true,
  saveUninitialized : true
}))

app.use(flash())

//setting message variables globally
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash(('success_msg'))
  res.locals.error_msg = req.flash(('error_msg'))
  next()
})



app.use("/", employeeRoute);


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true, useUnifiedTopology:true},
  (err)=>{
   if(!err){console.log(`connected to database`)}
   else{console.log("app not connected " + err)}
  }  
    
)


const PORT = (process.env.PORT || 3000)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})