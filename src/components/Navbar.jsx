import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
const Navbar = () => {
  const boards = useSelector((state) => state.boards);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Rai
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  My Tasks
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Boards
                </Link>
                <ul className="dropdown-menu">
                  {boards.map((board) => {
                    return (
                      <li key={board.id}>
                        <Link
                          className="dropdown-item"
                          to={`/boards/${board.id}`}
                        >
                          {board.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Create
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/createTask`}>
                      Task
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/createBoard`}>
                      Board
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Tasks"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Search
              </button>
            </form>
            <button
              className="ms-3 btn btn-outline-danger"
              onClick={(e) => {
                e.preventDefault();
                Cookies.remove("raiToken");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
