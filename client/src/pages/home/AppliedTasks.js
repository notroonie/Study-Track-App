import React from "react";
import TasksContainer from "../../components/TasksContainer";
import SearchContainer from "../../components/SearchContainer";

const AppliedTasks = () => {
  return (
    <section>
      <SearchContainer allTasks={false} />
      <TasksContainer allTasks={false} />
    </section>
  );
};

export default AppliedTasks;
