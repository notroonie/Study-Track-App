import React from "react";
import { useState, useEffect } from "react";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://api.indeed.com/")
      .then((res) => res.text)
      .then((res) => console.log(res));
  });
  return <div>Study</div>;
};

export default Task;
