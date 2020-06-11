import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Card } from 'reactstrap';


import WorkerNavbar from "./WorkerNavbar";
import Profile from "../Profile";
import ServicesList from "./ServicesList";

class WorkerHomepage extends Component {

    currentUser = () => { 
        return window.location.pathname.split("/").pop();
    };

    render() {
        const user = this.currentUser()
        return (
            <Card style={{ borderRadius: "25px" }}>
                <div className="container">
                    <WorkerNavbar />
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

export default WorkerHomepage;