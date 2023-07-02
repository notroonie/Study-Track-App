const mongoose = require("mongoose");

// const ListJobsSchema = new mongoose.Schema(
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
//     jobType: {
//       type: String,
//       enum: ["full-time", "part-time", "remote", "internship"],
//       default: "full-time",
//     },
//     jobLocation: {
//       type: String,
//       required: true,
//       default: "Bengaluru",
//     },
//   },
//   { timestamps: true }
// );
// module.exports = mongoose.model("ListJobs", ListJobsSchema);


const ListTaskSchema = new mongoose.Schema(
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
    state: {
      type: String,
      enum: ["complete", "incomplete", "doubt", "revise"],
      default: "complete",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ListTask", ListTaskSchema);


