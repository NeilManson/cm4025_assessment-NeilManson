const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs")


const app = express()
const PORT = 8000
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


// 404 page
app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(PORT, function () {
    console.log('Listening on http://localhost:'+PORT+'/');
});