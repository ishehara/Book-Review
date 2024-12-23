//qrn8XIGEf5cLbm0S
const express = require("express");
const mongoose = require("mongoose");

const app = express();

 // middleware

 app.use ("/",(req, res, next) => {
    res.send("It is working");
 })

 mongoose .connect ("mongodb+srv://Admin:pKuNOxeKUvEBTXtf@bookreview.yyghj.mongodb.net/")
 .then(() => console.log("Connected to MongoDB"))
 .then (() =>{
    app.listen(5000);
 })

 .catch((err) => console.log((err)));