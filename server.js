const express = require('express')
const app = express()
const db = require("./db.js");
const mongoose = require("mongoose")


const bodyParser = require("body-parser");
app.use(bodyParser.json());


 


 
app.get('/', (req, res) => {
  res.send('Hello priyanshu ')
})





const personRoutes = require('./routes/personRoutes');
app.use("/person", personRoutes);


const meanuRoutes = require('./routes/meanuRoutes');
app.use("/meanu", meanuRoutes);

app.listen(3000, ()=> {
  console.log("server running on post 3000");
});