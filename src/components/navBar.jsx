import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

// import Loading from "./loading";
import { useNavigate } from "react-router-dom";

// db password Qymbg5QhNbAzRn!

function NavBar() {
  const navigate = useNavigate();

  //   if (loading) {
  //     return (
  //       <>
  //         <Loading />
  //       </>
  //     );
  //   }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-light  border-bottom border-primary border-2 rounded p-2">
        <div className="container-fluid">
          <a className="navbar-brand text-primary border border-3 border-primary rounded p-2">
            <b> PHASE </b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/generators">
                  <h5> Generators </h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/level_sensors">
                  <h5> Level Sensors</h5>
                </Link>
              </li>
              <li
                className="nav-item"
                style={{
                  display: "block",
                }}
              >
                <Link className="nav-link text-primary" to="/reports">
                  <h5> Reports </h5>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default NavBar;
