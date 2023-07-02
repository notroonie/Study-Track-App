import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Register, Landing, ProtectedRoute, Error } from "./pages";

import {
  SharedLayout,
  Welcome,
  AllTasks,
  AddTask,
  AppliedTasks,
  Profile,
} from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Welcome />} />
          <Route path="/alltasks" element={<AllTasks />} exact />
          {/* <Route path="all-tasks" element={<AllTasks />} /> */}
          <Route path="applied-tasks" element={<AppliedTasks />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
