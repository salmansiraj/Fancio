import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Card } from 'reactstrap';


import ClientNavbar from "./ClientNavbar";
import Profile from "../Profile";
import ServicesList from "./ServicesList";

class ClientHomepage extends Component {

    currentUser = () => { 
        return window.location.pathname.split("/").pop();
    };

    render() {
        return (
            <Card style={{ borderRadius: "25px" }}>
                <div className="container">
                    <ClientNavbar />
                    <Profile user={this.currentUser()} />
                    <ServicesList user={this.currentUser()}/>
                </div>
            </Card>
        );
    }
}

export default ClientHomepage;