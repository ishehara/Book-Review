//qrn8XIGEf5cLbm0S
const express = require("express");
const mongoose = require("mongoose");
const router = require ("./Routes/ReviewRoute")

const app = express();

 // middleware

 app.use(express.json());
 app.use ("/reviews",router)

 mongoose .connect ("mongodb+srv://Admin:pKuNOxeKUvEBTXtf@bookreview.yyghj.mongodb.net/")
 .then(() => console.log("Connected to MongoDB"))
 .then (() =>{
    app.listen(5000);
 })

 .catch((err) => console.log((err)));