import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { API_ROUTES } from "../utils/apiRoutes";

const Tasks = () => {
  const token = Cookies.get("raiToken");
  const userId = jwtDecode(token).jti;
  const [tasks, setTasks] = useState([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);

  const colorMap = {
    story: "warning",
    bug: "danger",
  };

  const fetchUserTasks = async () => {
    try {
      const response = await fetch(API_ROUTES.GET_TASKS_BY_USER_ID + userId, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status < 300) {
        const taskList = await response.json();
        console.log(taskList);
        setTasks(taskList);
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

  useEffect(() => {
    if (userId != null) {
      fetchUserTasks();
    }
  }, [userId]);

  return (
    <>
      {loading ? (
        <div className="container mt-4">
          <div className="alert alert-info" role="alert">
            Loading tasks...
          </div>
        </div>
      ) : showError ? (
        <div className="container mt-4">
          <div className="alert alert-danger" role="alert">
            Something went wrong
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="container mt-4">
          <div className="alert alert-warning" role="alert">
            No tasks present
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          {tasks.map((task) => (
            <div key={task.id} className="mb-4">
              <div className="card">
                <h5 className="card-header">
                  {task.title}
                  <span className={`badge ms-2 text-bg-${colorMap[task.tag]}`}>
                    {task.tag}
                  </span>
                </h5>
                <div className="card-body">
                  <p className="card-text">{task.description}</p>
                  <p className="card-text mt-2">
                    <small className="text-muted">
                      Created At: {new Date(task.createdAt).toLocaleString()}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Updated At: {new Date(task.updatedAt).toLocaleString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Tasks;
