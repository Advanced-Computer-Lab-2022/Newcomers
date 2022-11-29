const express = require("express");
const Administrator = require("../models/administratorModel");
const mongoose = require("mongoose");

const router = express.Router();

// GET all administrators
router.post("/login", async (req, res) => {
    //find an existing user
  let user = await Administrator.findOne({ username: req.body.username, password: req.body.password });
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username
  });
});

// GET a single administrator
// router.post("/signup", getAdministrator);

module.exports = router;