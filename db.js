const mongoose = require("mongoose");
require("dotenv").config();
const Url = process.env.MONGODB_URL_LOCAL;

mongoose.connect(Url);

const db = mongoose.connection;

//success message
db.on("connected", () => console.log("server is connected"));

//failed message
db.on("disconnected", () => console.log("server is disconnected"));

//error message
db.on("error", () => console.log("server is error"));

module.exports = db;
