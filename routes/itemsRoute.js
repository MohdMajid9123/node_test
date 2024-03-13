const express = require("express");
const route = express.Router();

//import itemModel.js
const itemModel = require("./../models/itemsModel");

route.get("/", async (req, res) => {
  try {
    let data = await itemModel.find();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// post mathod

route.post("/", async (req, res) => {
  try {
    const data = req.body;

    const dataStore = new itemModel(data);
    const dataSave = await dataStore.save();
    res.status(200).json(dataSave);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// put / patch method

route.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const personData = req.body;

    const dataStore = await itemModel.findByIdAndUpdate(personId, personData, {
      new: true,
      runValidators: true,
    });
    const dataSave = await dataStore.save();
    res.status(200).json(dataSave);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete method
route.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const dataStore = await itemModel.findByIdAndDelete(personId);
    res.status(200).json(dataStore);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// search by test

route.get("/:test", async (req, res) => {
  try {
    const testData = req.params.test;

    const dataFind = await itemModel.find({ test: testData });

    if (testData === "sweet" || testData === "spicy" || testData === "sour") {
      return res.status(200).json(dataFind);
    } else {
      return res
        .status(401)
        .json({ message: `we don't get  ${testData} data ` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = route;
