import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from "react";
import { Card } from 'reactstrap';

import StylistNavbar from "./StylistNavbar";
import StylistList from "./StylistList";

class StylistHomepage extends Component {

    currentUser = () => {
        return window.location.pathname.split("/").pop();
    };


    render() {  
        // console.log(this.currentUser())
        return (
            <Card style={{ borderRadius: "25px" }}>
                <div className="container">
                    <StylistNavbar user={this.currentUser()}/>
                    <br />
                    <StylistList user={this.currentUser()}/>
                </div>
            </Card>
        );
    }
}

export default StylistHomepage;