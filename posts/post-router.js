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

router.post("/", async (req, res, next) => {
  try {
    const [id] = await db("posts").insert(req.body);
    const post = await db("posts")
      .where({ id })
      .first();
    if (post) {
      res.status(201).json({ newPost: post });
    } else {
      res.status(400).json({ message: "Columns should be filled" });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedPost = await db("posts")
      .where({ id: req.params.id })
      .update(req.body);

    if (updatedPost) {
      res.status(201).json(updatedPost);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db("posts")
      .where({ id: req.params.id })
      .del();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
