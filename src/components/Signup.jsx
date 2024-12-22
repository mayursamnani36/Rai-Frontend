import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { API_ROUTES } from "../utils/apiRoutes";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(API_ROUTES.CREATE_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      if (response.status <= 300) {
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h2
          className="card-title text-center mb-4"
          style={{ color: "#007bff" }}
        >
          Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ borderRadius: "10px" }}
          >
            {loading ? "Loading..." : "Signup"}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login">
            <button className="btn btn-link" style={{ color: "#007bff" }}>
              Already have an account? Login
            </button>
          </Link>
        </div>
        {showError && (
          <div
            className="mt-3 alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            Something went wrong!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowError(false)}
            />
          </div>
        )}
        {showSuccess && (
          <div
            className="mt-3 alert alert-success alert-dismissible fade show"
            role="alert"
          >
            User created successfully. Please login via login page.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowSuccess(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
