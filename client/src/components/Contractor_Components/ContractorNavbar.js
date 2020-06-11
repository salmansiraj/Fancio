import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/loginlogo.png'

export default class Navbar extends Component {

    currentUser = () => {
      return window.location.pathname.split("/").pop();
    };

    render() { 
        console.log(this.props)
        return (
          <nav
            className="navbar navbar-light navbar-expand-lg"
            style={{ width: "100%" }}
          >
            <Link className="navbar-brand">
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
                  <Link
                    to={"/contractorHomepage/" + this.currentUser()}
                    className="nav-link"
                  >
                    Appointments
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link
                    to={"/create/" + this.currentUser()}
                    className="nav-link"
                  >
                    Create Service
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">
                    Logout
                  </Link>
                </li>
                <li className="navbar-item"></li>
              </ul>
            </div>
          </nav>
        );
    }
}