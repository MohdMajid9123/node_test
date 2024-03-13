const express = require("express");
const app = express();
require("dotenv").config();

// import db
require("./db");

// port server
const port = process.env.PORT || 4000;

// cover json into object
app.use(express.json());

const logRequest = (req, res, next) => {
  try {
    console.log(`[${new Date().toLocaleString()}] made to :${req.originalUrl}`);
    next();
  } catch (error) {
    console.log(error);
  }
};

app.use(logRequest);

app.get("/", (req, res) => {
  res.send("welcom to my page");
});

//personRoutes.js
const personRoute = require("./routes/personRoute");
const itemRoute = require("./routes/itemsRoute");

// routes

app.use("/person", personRoute);
app.use("/item", itemRoute);

app.listen(port, () => console.log(`server is running on ${port}`));
