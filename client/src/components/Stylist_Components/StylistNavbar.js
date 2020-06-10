import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/loginlogo.png'

export default class Navbar extends Component {

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
                height="80"
                class="d-inline-block align-top"
                alt=""
                loading="lazy"
              />
            </Link>

            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link
                    to={"/stylistHomepage/" + this.props.user}
                    className="nav-link"
                  >
                    Appointments
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to={"/create/" + this.props.user} className="nav-link">
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