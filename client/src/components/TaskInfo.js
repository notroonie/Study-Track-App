import React from "react";

const TaskInfo = ({ icon, iconType, text }) => {
  console.log(iconType);
  return (
    <div className="task-info">
      <span className={`icon ${iconType}`}>{icon}</span>
      <span className="task-info-text">{text}</span>
    </div>
  );
};

export default TaskInfo;
