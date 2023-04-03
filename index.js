require("dotenv").config();
const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs")
const passport = require("passport");
//const User = require("./schemas/User.js")

//routes
const authRoute = require("./routes/auth.js");
const quoteRoute = require("./routes/quotes.js");

const app = express()
const PORT = process.env.PORT



app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}))

//initialize passport
app.use(passport.initialize());

//use passport to deal with session
app.use(passport.session());

//database stuff
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("database connected"))
    .catch(err => console.log("err"))
mongoose.set('strictQuery', true)
//use routes
app.use('/', authRoute);
app.use('/', quoteRoute);

//get paths
app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/addQuotes")
    } else {
        res.redirect("/signIn");
    }
});

//signin page
app.get("/signIn", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/addQuotes")
    } else {
        res.render("login")
    }
});

//Registration page
app.get("/register", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/addQuotes")
    } else {
        res.render("register")
    }
});



// 404 page
app.use(function (req, res, next) {
    res.send('This page does not exist!')
});

app.listen(PORT, function () {
    console.log('Listening on http://localhost:' + PORT + '/');
});