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
        const user = this.currentUser()
        return (
            <Card style={{ borderRadius: "25px" }}>
                <div className="container">
                    <ClientNavbar />
                    <Profile user={user} />
                    <h5 className="text-center" style={{ color: "#588498", paddingTop: "10px" }}>
                        Hey {user}!
                    </h5>
                    <ServicesList user={user}/>
                </div>
            </Card>
        );
    }
}

export default ClientHomepage;