const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    enum: ["waiter", "chef", "manager", "ceo"],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

// create save function

personSchema.pre("save", async function (next) {
  const person = this;

  if (!person.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);

    // create hashPassword

    const hashPassword = await bcrypt.hash(person.password, salt);

    // assign password

    person.password = hashPassword;

    next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// create comparePassword fucntion

personSchema.methods.comPassFun = async function (candidatePass) {
  try {
    const isMatch = await bcrypt.compare(candidatePass, this.password);
    return isMatch;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const Person = mongoose.model("person", personSchema);

module.exports = Person;
