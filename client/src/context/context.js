import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState1 = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  isEditing: false,
  editTaskId: "",
  taskname: "",
  domain: "",
  stateOptions: ["complete", "incomplete", "doubt", "revise"],
  state: "complete",
  statusOptions: ["easy", "hard", "medium"],
  status: "easy",
  allTasks: false,
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  tasks: [],
  taskTypeOptions : ["t1","t2"],
  totalTasks: 0,
  numOfPages: 1,
  page: 1,
  
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state1, dispatch] = useReducer(reducer, initialState1);

  const displayAlert = () => {
    dispatch({ type: "DISPLAY_ALERT" });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: "CLEAR_ALERT" });
    }, 3000);
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    // console.log(currentUser);
    dispatch({ type: "SETUP_USER_BEGIN" });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token } = data;
      dispatch({
        type: "SETUP_USER_SUCCESS",
        payload: {
          user,
          token,
          alertText,
        },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: "SETUP_USER_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state1.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const updateUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: "UPDATE_USER_BEGIN" });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, token } = data;
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: { user, token } });
      addUserToLocalStorage(user, token);
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    removeUserFromLocalStorage();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: "HANDLE_CHANGE", payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: "CLEAR_VALUES" });
  };

  const createTask = async () => {
    dispatch({ type: "CREATE_TASK_BEGIN" });
    try {
      const { taskname, domain, state, status } = state1;
      await authFetch.post("/tasks", {
        domain,
        taskname,
        state,
        status,
      });
      dispatch({ type: "CREATE_TASK_SUCCESS" });
      dispatch({ type: "CLEAR_VALUES" });
    } catch (error) {
      dispatch({
        type: "CREATE_TASK_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getTasks = async () => {
    const { page, search, searchStatus, searchType, sort } = state1;
    let url = `/tasks?page=${page}&status=${searchStatus}&state=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: "GET_TASKS_BEGIN" });
    try {
      const { data } = await authFetch(url);
      const { tasks, totalTasks, numOfPages } = data;
      dispatch({
        type: "GET_TASKS_SUCCESS",
        payload: { tasks, totalTasks, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAllTasks = async () => {
    const { page, search, searchType, sort } = state1;
    let url = `/listTasks?page=${page}&state=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: "GET_TASKS_BEGIN" });
    try {
      const { data } = await authFetch(url);
      const { tasks, totalTasks, numOfPages } = data;
      dispatch({
        type: "GET_TASKS_SUCCESS",
        payload: { tasks, totalTasks, numOfPages },
      });
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };

  const setEditTask = (id) => {
    console.log(`set edit task: ${id}`);
    dispatch({ type: "SET_EDIT_TASK", payload: { id } });
  };

  const editTask = async () => {
    
    dispatch({ type: "EDIT_TASK_BEGIN" });
    try {
      const { taskname, domain,  state, status } = state1;
      await authFetch.patch(`/tasks/${state1.editTaskId}`, {
        domain,
        taskname,
        state,
        status,
      });
      dispatch({ type: "EDIT_TASK_SUCCESS" });
      dispatch({ type: "CLEAR_VALUES" });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: "EDIT_TASK_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteTask = async (taskId) => {
  
    dispatch({ type: "DELETE_TASK_BEGIN" });
    try {
      await authFetch.delete(`/tasks/${taskId}`);
      getTasks();
    } catch (error) {
      logoutUser();
    }
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const changePage = (page) => {
    dispatch({ type: "CHANGE_PAGE", payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state1,
        displayAlert,
        setupUser,
        updateUser,
        logoutUser,
        handleChange,
        clearValues,
        createTask,
        getTasks,
        getAllTasks,
        setEditTask,
        editTask,
        deleteTask,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { useAppContext, AppProvider, initialState1 };
