import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_ROUTES } from "../utils/apiRoutes";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: "",
    assignee: "",
    state: "",
    priority: "",
    tag: "",
  });

  const userList = useSelector((state) => state.users);
  const navigate = useNavigate();
  const token = Cookies.get("raiToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(API_ROUTES.CREATE_TASK, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status < 300) {
        navigate("/");
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isFormValid = Object.values(formData).every(
    (field) => field.trim() !== ""
  );

  return (
    <div className="container mt-5">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="points" className="form-label">
            Points
          </label>
          <input
            type="number"
            className="form-control"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="assignee" className="form-label">
            Assignee
          </label>
          <select
            className="form-control"
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
          >
            <option value="">Select Assignee</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.userName}
              </option>
            ))}
          </select>
          <p>
            Selected Assignee:{" "}
            {userList.find((user) => user.id === formData.assignee)?.username ||
              "None"}
          </p>
        </div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <input
            type="text"
            className="form-control"
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
