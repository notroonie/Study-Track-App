const express = require("express");
const { StatusCodes } = require("http-status-codes");
const ListTasks = require("../models/ListTasks");
const router = express.Router();
router.route("/").get(async (req, res) => {
  const { search, state, sort } = req.query;
  const queryObject = {};
  if (state && state !== "all") {
    queryObject.state = state;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  let result = ListTasks.find(queryObject);
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const tasks = await result;

  const totalTasks = await ListTasks.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTasks/ limit);
  res.status(StatusCodes.OK).json({ tasks,totalTasks, numOfPages });
});

module.exports = router;
