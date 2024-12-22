import React from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("raiToken");

  const isTokenValid = () => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp > Date.now() / 1000) {
        return true;
      }
      Cookies.remove("raiToken");
      return false;
    } catch (error) {
      return false;
    }
  };

  if (!token || !isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
