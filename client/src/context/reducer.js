import { initialState1 } from "./context";

const reducer = (state1, action) => {
  if (action.type === "DISPLAY_ALERT") {
    return {
      ...state1,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values...",
    };
  }
  if (action.type === "CLEAR_ALERT") {
    return {
      ...state1,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === "SETUP_USER_BEGIN") {
    return {
      ...state1,
      isLoading: true,
    };
  }
  if (action.type === "SETUP_USER_SUCCESS") {
    return {
      ...state1,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === "SETUP_USER_ERROR") {
    return {
      ...state1,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "UPDATE_USER_BEGIN") {
    return { ...state1, isLoading: true };
  }
  if (action.type === "UPDATE_USER_SUCCESS") {
    return {
      ...state1,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === "UPDATE_USER_ERROR") {
    return {
      ...state1,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "LOGOUT_USER") {
    return {
      ...initialState1,
      user: null,
      token: null,
    };
  }
  if (action.type === "HANDLE_CHANGE") {
    // console.log(action.payload.name, action.payload.value);
    return {
      ...state1,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === "CLEAR_VALUES") {
    const initialState1 = {
      isEditing: false,
      editTaskId: "",
      taskname: "",
      domain: "",
      state: "complete",
      level: "easy",
      
    };
    return {
      ...state1,
      ...initialState1,
    };
  }
  if (action.type === "CREATE_TASK_BEGIN") {
    return {
      ...state1,
      isLoading: true,
    };
  }
  if (action.type === "CREATE_TASK_SUCCESS") {
    return {
      ...state1,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New task created!",
    };
  }
  if (action.type === "CREATE_TASK_ERROR") {
    return {
      ...state1,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "GET_TASKS_BEGIN") {
    return { ...state1, isLoading: true, showAlert: false };
  }
  if (action.type === "GET_TASKS_SUCCESS") {
    return {
      ...state1,
      isLoading: false,
      tasks: action.payload.tasks,
      totalTasks: action.payload.totalTasks,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === "SET_EDIT_TASK") {
    const task = state1.tasks.find((task) => task._id === action.payload.id);
    const { _id, taskname, domain,  state, level } = task;
    return {
      ...state1,
      isEditing: true,
      editTaskId: _id,
      taskname,
      domain,
      state,
      level,
    };
  }
  if (action.type === "DELETE_TASK_BEGIN") {
    return { ...state1, isLoading: true };
  }
  if (action.type === "EDIT_TASK_BEGIN") {
    return { ...state1, isLoading: true };
  }
  if (action.type === "EDIT_TASK_SUCCESS") {
    return {
      ...state1,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "task updated!",
    };
  }
  if (action.type === "EDIT_TASK_ERROR") {
    return {
      ...state1,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "CLEAR_FILTERS") {
    return {
      ...state1,
      search: "",
      searchlevel: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === "CHANGE_PAGE") {
    return {
      ...state1,
      page: action.payload.page,
    };
  }
  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
