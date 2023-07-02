import React, { useEffect } from "react";
import { useAppContext } from "../context/context";
import Task from "./Task";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";

const TasksContainer = ({ allTasks }) => {
  const {
    tasks,
    totalTasks,
    page,
    numOfPages,
    getTasks,
    getAllTasks,
    isLoading,
    search,
    searchType,
    searchStatus,
    sort,
  } = useAppContext();

  useEffect(() => {
    // if (!allTasks) {
      getTasks();
    // }
  }, []);


  // useEffect(() => {
  //   if (!allTasks) {
  //     getTasks();
  //   }
  // }, [allTasks, getTasks, page, search, searchStatus, searchType, sort]);

  // useEffect(() => {
  //   if (allTasks) {
  //     getAllTasks();
  //   }
  // }, [allTasks, getAllTasks, page, search, searchType, sort]);

  // if (isLoading) {
  //   return <Loading />;
  // }
  if (tasks.length === 0) {
    return <h2 className="no-tasks">No tasks to display...</h2>;
  }
  return (
    <div>
      <h5 className="tasks-count">
        {totalTasks} Task{tasks.length > 1 && "s"} Found
      </h5>
      <section className="tasks-container">
        {tasks.map((task) => {
          return <Task key={task._id} {...task} allTasks={allTasks} />;
        })}
      </section>
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  );
};

export default TasksContainer ;
