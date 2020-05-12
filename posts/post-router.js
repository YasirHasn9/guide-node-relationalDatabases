const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await db("posts").select("*");
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await db("posts")
      .where({ id: req.params.id })
      .first();
    if (post) {
      res.json(post);
    } else {
      res.status(500).json({ message: "Not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
