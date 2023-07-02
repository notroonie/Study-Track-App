import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { useAppContext } from "../context/context";
import TaskInfo from "./TaskInfo";

const Task = ({
  _id,
  domain,
  taskname,
  level,
  state,
  createdAt,
  allTasks,
}) => {
  const { setEditTask, deleteTask } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <article className="task-box">
      <header className="task-header">
        <div className="main-icon">{domain.charAt(0)}</div>
        <div className="info">
          <h5>{taskname}</h5>
          <p>{domain}</p>
        </div>
      </header>
      <section className="task-info-container">
        {/* <taskInfo
          icon={<FaLocationArrow />}
          iconType={"location"}
          text={taskLocation}
        /> */}
        <TaskInfo icon={<FaCalendarAlt />} iconType="calender" text={date} />
        <TaskInfo icon={<FaBriefcase />} iconType="briefcase" text={state} />
        {!allTasks && (
          <div className={`task-info level ${level}`}>{level}</div>
        )}
        {!allTasks && (
          <div className="task-btns">
            <Link
              to="/add-task"
              className="btn edit-btn"
              onClick={() => setEditTask(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                deleteTask(_id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </section>
    </article>
  );
};

export default Task;
