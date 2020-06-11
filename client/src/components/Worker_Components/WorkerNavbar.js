import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/loginlogo.png";

export default class WorkerNavbar extends Component {

  currentUser = () => {
    return "/workerHomepage/" + window.location.pathname.split("/").pop();
  };

  render() {
    return (
      <nav
        className="navbar navbar-light navbar-expand-lg"
        style={{ width: "100%"}}
      >
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            width="200"
            height="66.66"
            class="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
        </Link>

        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to={this.currentUser} className="nav-link">
                Services
              </Link>
            </li>

            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
