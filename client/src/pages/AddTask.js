import React from "react";
import { useAppContext } from "../../context/context";
import Alert from "../../components/Alert";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import FormTextArea from "../../components/FormTextArea";

const AddTask = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    taskname,
    domain,
    state,
    stateOptions,
    level,
    levelOptions,
    description,
    handleChange,
    clearValues,
    createTask,
    editTask,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskname || !domain) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editTask();
      return;
    }
    createTask();
  };

  const handleTaskInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <form className="big-form" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: "1em" }}>
        {isEditing ? "Edit task" : "Add task"}
      </h3>
      {showAlert && <Alert />}
      <div className="inputs">
        <FormRow
          type="text"
          name="taskname"
          value={taskname}
          handleChange={handleTaskInput}
          className="inline-row"
        />
        <FormRow
          type="text"
          name="domain"
          value={domain}
          handleChange={handleTaskInput}
          className="inline-row"
        />
        {/* <FormRow
          type="text"
          name="taskLocation"
          value={taskLocation}
          handleChange={handleTaskInput}
          className="inline-row"
        /> */}
        <FormRowSelect
          labelText="level"
          name="level"
          value={level}
          handleChange={handleTaskInput}
          list={levelOptions}
        />
        
       <FormTextArea
          labelText="description"
          name="description"
          value={description}
          rows="4"
         cols="50"
          // handleChange={handleTaskInput}
          // list={levelOptions}
          className="inline-row"
        />
        <FormRowSelect
          labelText="task type"
          name="state"
          value={state}
          handleChange={handleTaskInput}
          list={stateOptions}
        />

        <div className="inline-row btns">
          <button
            type="submit"
            className="btn btn-block submit-btn"
            disabled={isLoading}
          >
            Submit
          </button>
          <button
            type="reset"
            className="btn btn-block clear-btn"
            onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTask;
