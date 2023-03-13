const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs")


const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", ejs);
