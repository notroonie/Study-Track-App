const express = require("express");
const {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} = require("../controllers/tasksController");

const router = express.Router();

router.route("/").post(createTask).get(getAllTasks);
router.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = router;
