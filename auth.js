const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//import personModel
const Person = require("./models/personModel");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    //

    const user = await Person.findOne({ username });

    // check username
    if (!user) {
      return done(null, false, { message: "username incorrect" });
    }
    const isPasswordMatch = await user.comPassFun(password);

    if (isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: "password incorrect" });
    }
  })
);
module.exports = passport;
