const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/", validateAccount, async (req, res) => {
  try {
    const accounts = await db("accounts").insert(req.body);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json(error);
  }
});

function validateAccount(req, res, next) {
  if (Object.keys(req.body).length) {
    if (!req.body.name || !req.body.budget) {
      res.status(400).json({ message: "Data missing" });
    } else {
      next();
    }
  } else {
    res.status(500).json({ message: "Error missing request body" });
  }
}

module.exports = server;
