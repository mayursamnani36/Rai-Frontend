import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/App.css";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import React, { useEffect, useState } from "react";
import { API_ROUTES } from "./utils/apiRoutes";
import { useDispatch } from "react-redux";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const token = Cookies.get("raiToken");

  const fetchBoards = async () => {
    try {
      const response = await fetch(API_ROUTES.GET_BOARDS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status < 300) {
        const boards = await response.json();
        console.log(boards);
        dispatch({
          type: "UPDATE_BOARDS_LIST",
          payload: boards,
        });
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_ROUTES.GET_USERS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status < 300) {
        const users = await response.json();
        console.log(users);
        dispatch({
          type: "UPDATE_USERS_LIST",
          payload: users,
        });
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoards().then(fetchUsers()).then(setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default App;
