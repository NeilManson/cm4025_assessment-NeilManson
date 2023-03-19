require("dotenv").config();
const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs")
const passport = require("passport")
//const User = require("./schemas/User.js")

//routes
const authRoute = require("./routes/auth.js")


const app = express()
const PORT = process.env.PORT



app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(session({
    secret: "SESSION",
    resave: false,
    saveUninitialized: true,
}))

//initialize passport
app.use(passport.initialize());

//use passport to deal with session
app.use(passport.session());

//database stuff
mongoose.connect(process.env.DB_URL)
.then(()=> console.log("database connected"))
.catch(err => console.log("err"))
mongoose.set('strictQuery', true)
//use routes
app.use('/', authRoute);

//get paths
app.get("/", function (req, res) {
    res.redirect("/signIn");
  });
  
//signin page
app.get("/signIn", function(req, res){
    res.render("login")
});

//Registration page
app.get("/register", function(req, res){
    res.render("register")
});

app.get("/addQuotes", function(req, res){
  res.render("addQuotes")
})

// post paths

// app.post('/doLogin',async function(req, res) {
//   var email_log = req.body.email;
//   var pword = req.body.password;
//   console.log(email_log);
//   var result = await User.findOne({email:email_log, password:pword});
//   console.log(result)
//   res.send("logged in");
  
//   // User.findOne({email: email_log, password: pword}, function (err, user) {
//   //   if(err) {
//   //     console.log(err);
//   //     return res.status(500).send();
//   //   }

//   //   if(!user) {
//   //     res.redirect("/signIn");
//   //     return res.status(404).send()
//   //   }
//   //   req.session.loggedin = true;
//   //   req.session.email = email;
//   //   req.session.isadmin = user.isAdmin
//   //   return res.status(200).send()
//   // })
// })

// app.post('/doRegister',async function(req, res) {
//   var email = req.body.email;
//   var password = req.body.password;
//   var firstname = req.body.firstname;
//   var lastname = req.body.lastname;

//   var newUser = new User();
//   newUser.email = email;
//   newUser.password = password;
//   newUser.firstname = firstname;
//   newUser.lastname = lastname;
//   console.log(newUser)
//   await newUser.save()
//   res.redirect("/signIn");
// })


// 404 page
app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(PORT, function () {
    console.log('Listening on http://localhost:'+PORT+'/');
});