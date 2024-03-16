const express = require("express");
const app = express();
require("dotenv").config();

// import db
require("./db");

// port server
const port = process.env.PORT || 4000;

// import passport.js by auth.js
const passport = require("./auth");

// cover json into object
app.use(express.json());

// logRegistrastion

const logUser = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Made Request : ${req.originalUrl}`
  );
  next();
};

app.use(logUser);

app.use(passport.initialize());
const middleware = passport.authenticate("local", { session: false });

//personRoutes.js
app.get("/", middleware, (req, res) => {
  res.send("welcom to my page");
});

// route files import
const personRoute = require("./routes/personRoute");
const itemRoute = require("./routes/itemsRoute");

// routes

app.use("/person", personRoute);
app.use("/item", itemRoute);

app.listen(port, () => console.log(`server is running on ${port}`));
