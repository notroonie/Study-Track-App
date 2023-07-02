const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const checkPermissions = require("../utils/checkPermissions");

const createTask = async (req, res) => {
  const { taskname, domain } = req.body;
  if (!taskname || !domain) {
    throw new BadRequestError("Provide all the values");
  }
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const deleteTask = async (req, res) => {
 
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new NotFoundError(`No task with id: ${taskId}`);
  }
  checkPermissions(req.user, task.createdBy);
  await task.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! task removed" });
};

const getAllTasks = async (req, res) => {
  const { search, level, state, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (level && level !== "all") {
    queryObject.level = level;
  }
  if (state && state !== "all") {
    queryObject.state = state;
  }
  if (search) {
    queryObject.taskname = { $regex: search, $options: "i" };
  }

  let result = Task.find(queryObject);
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("taskname");
  }
  if (sort === "z-a") {
    result = result.sort("-taskname");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const tasks = await result;

  const totalTasks = await Task.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTasks / limit);
  res.status(StatusCodes.OK).json({ tasks, totalTasks, numOfPages });
};

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { domain, taskname } = req.body;
  if (!taskname || !domain) {
    throw new BadRequestError("Provide all the values");
  }
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new NotFoundError(`No Task with id: ${taskId}`);
  }
  checkPermissions(req.user, task.createdBy);
  const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedTask });
};

module.exports = {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask
};
