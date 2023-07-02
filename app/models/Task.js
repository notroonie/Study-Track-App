const mongoose = require("mongoose");

// const JobSchema = new mongoose.Schema(
//   {
//     company: {
//       type: String,
//       required: [true, "Provide company name"],
//       maxlength: 30,
//     },
//     position: {
//       type: String,
//       required: [true, "Provide position"],
//       maxlength: 50,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "interview", "declined"],
//       default: "pending",
//     },
//     jobType: {
//       type: String,
//       enum: ["full-time", "part-time", "remote", "internship"],
//       default: "full-time",
//     },
//     jobLocation: {
//       type: String,
//       required: true,
//       default: "Hyderabad",
//     },
//     createdBy: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       required: [true, "Provide user details"],
//     },
//   },
//   { timestamps: true }
// );
// module.exports = mongoose.model("Job", JobSchema);
const TaskSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: [true, "Provide domain name"],
      maxlength: 30,
    },
    taskname: {
      type: String,
      required: [true, "Provide task name "],
      maxlength: 50,
    },
    level: {
      type: String,
      enum: ["easy", "hard", "medium"],
      default: "easy",
    },
    state: {
      type: String,
      enum: ["complete", "incomplete", "doubt", "revise"],
      default: "complete",
    },
    description :{
      type: String,
      // required: [true, "Provide task name "],
      maxlength: 50,

    },
    createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Provide user details"],
          },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema);

