const express = require("express");
const route = express.Router();

// import personModel.js

const Person = require("./../models/personModel");

// get method
route.get("/", async (req, res) => {
  try {
    const data = await Person.find();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
});

// post method
route.post("/", async (req, res) => {
  try {
    const data = req.body;
    const saveData = new Person(data);
    const response = await saveData.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
});

// put method

route.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const personData = req.body;
    const saveData = await Person.findByIdAndUpdate(personId, personData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(saveData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
});

//delete method

route.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const saveData = await Person.findByIdAndDelete(personId);

    res.status(200).json(saveData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
});

// search by data name

route.get("/:work", async (req, res) => {
  try {
    const getWork = req.params.work;

    const findTest = await Person.find({ work: getWork });

    if (getWork === "waiter" || getWork === "chef" || getWork === "manager") {
      return res.status(200).json(findTest);
    } else {
      return res
        .status(401)
        .json({ message: `we don't get  ${getWork} data ` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
});

module.exports = route;
