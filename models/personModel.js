const mongoose = require("mongoose");

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
});

const Person = mongoose.model("person", personSchema);

module.exports = Person;
