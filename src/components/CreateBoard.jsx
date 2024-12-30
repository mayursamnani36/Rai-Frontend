import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_ROUTES } from "../utils/apiRoutes";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const CreateBoard = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("raiToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title });
    try {
      const response = await fetch(API_ROUTES.CREATE_BOARD, {
        method: "POST",
        body: JSON.stringify({
          title: title,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status < 300) {
        window.location.href = "/";
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Create Board</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
