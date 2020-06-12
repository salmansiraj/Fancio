import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Card } from 'reactstrap';


import WorkerNavbar from "./WorkerNavbar";
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
                    <WorkerNavbar user={user} />
                    <br /><br />
                    <ServicesList user={user}/>
                </div>
            </Card>
        );
    }
}

export default WorkerHomepage;