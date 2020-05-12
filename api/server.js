const express = require("express");
const helmet = require("helmet");

const PostRouter = require("../posts/post-router.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/posts", PostRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
