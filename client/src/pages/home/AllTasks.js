import React from "react";
import TasksContainer from "../../components/TasksContainer";
import SearchContainer from "../../components/SearchContainer";

const AllTasks = () => {
  return (
    <section>
      <SearchContainer allTasks={true} />
      <TasksContainer allTasks={true} />
    </section>
  );
};

export default AllTasks;
