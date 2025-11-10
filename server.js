const express = require('express')
const app = express()
const db = require("./db.js");
const mongoose = require("mongoose");
//const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');
const passport = require('./auth');

const bodyParser = require("body-parser");
app.use(bodyParser.json());


//middleware function
const logRequest = (req, res, next) => {
 console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false})
app.get('/', function (req, res)  {
  res.send('Hello priyanshu ');
})


const personRoutes = require('./routes/personRoutes.js');
app.use("/person",localAuthMiddleware, personRoutes);


const meanuRoutes = require('./routes/meanuRoutes.js');
app.use("/Meanu", meanuRoutes);

app.listen(3000, ()=> {
  console.log("server running on post 3000");
});