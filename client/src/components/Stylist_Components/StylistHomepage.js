import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Card } from 'reactstrap';

import Profile from '../Profile'
import StylistNavbar from "./StylistNavbar";
import StylistList from "./StylistList";

class StylistHomepage extends Component {

    currentUser = () => {
        return window.location.pathname.split("/").pop();
    };


    render() {

        return (
          <Card style={{ borderRadius: "25px" }}>
            <div className="container">
              <StylistNavbar user={this.currentUser()} />
              <Profile user={this.currentUser()} />
              <StylistList user={this.currentUser()} />
            </div>
          </Card>
        );
    }
}

export default StylistHomepage;