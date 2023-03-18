require("dotenv").config();
const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs")
const User = require("./schemas/User.js")


const app = express()
const PORT = 8000

//database stuff
mongoose.connect(process.env.DB_URL)
.then(()=> console.log("database connected"))
.catch(err => console.log("err"))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", ejs);

app.use(session({
    secret: "SESSION",
    resave: true,
    saveUninitialized: true,
}))

app.disable("view cache");


//get paths
app.get("/", function (req, res) {
    if (req.session.loggedin && !req.session.isadmin) {
      res.redirect("/quotes_user");
    } else if (req.session.loggedin && req.session.isadmin) {
      res.redirect("/quotes_admin");
    } else {
      res.redirect("/signIn");
    }
  });
  
//signin page
app.get("/signIn", function(req, res){
    res.sendFile("public/login.html", {root:__dirname});
});

//Registration page
app.get("/register", function(req, res){
    res.sendFile("public/register.html", {root:__dirname});
});

// post paths

app.post('/doLogin',async function(req, res) {
  var email_log = req.body.email;
  var pword = req.body.password;
  console.log(email_log);
  var result = await User.findOne({email:email_log, password:pword});
  console.log(result)
  res.send("logged in");
  
  // User.findOne({email: email_log, password: pword}, function (err, user) {
  //   if(err) {
  //     console.log(err);
  //     return res.status(500).send();
  //   }

  //   if(!user) {
  //     res.redirect("/signIn");
  //     return res.status(404).send()
  //   }
  //   req.session.loggedin = true;
  //   req.session.email = email;
  //   req.session.isadmin = user.isAdmin
  //   return res.status(200).send()
  // })
})

app.post('/doRegister',async function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  var newUser = new User();
  newUser.email = email;
  newUser.password = password;
  newUser.firstname = firstname;
  newUser.lastname = lastname;
  console.log(newUser)
  await newUser.save()
  res.redirect("/signIn");
})


// 404 page
app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(PORT, function () {
    console.log('Listening on http://localhost:'+PORT+'/');
});