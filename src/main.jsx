import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import Board from "./components/Board.jsx";
import Tasks from "./components/Tasks.jsx";
import Signup from "./components/Signup.jsx";
import React from "react";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Provider } from "react-redux";
import raiStore from "./store/Store.jsx";
import CreateTask from "./components/CreateTask.jsx";
import CreateBoard from "./components/CreateBoard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={raiStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<App />} />}>
            <Route index element={<Tasks />} />
            <Route
              path="boards/:boardId"
              element={<ProtectedRoute element={<Board />} />}
            />
            <Route
              path="createTask"
              element={<ProtectedRoute element={<CreateTask />} />}
            />
            <Route
              path="createBoard"
              element={<ProtectedRoute element={<CreateBoard />} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
