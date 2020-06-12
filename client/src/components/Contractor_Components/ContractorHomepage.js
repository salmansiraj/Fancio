import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Card } from 'reactstrap'
import ContractorNavbar from "./ContractorNavbar";
import ContractorList from "./ContractorList";

class ContractorHomepage extends Component {

    currentUser = () => {
        return window.location.pathname.split("/").pop();
    };


    render() {

        return (
          <Card style={{ borderRadius: "25px" }}>
            <div className="container">
              <ContractorNavbar user={this.currentUser()} homepage={true} />
              <br /><br />
              <ContractorList user={this.currentUser()} />
            </div>
          </Card>
        );
    }
}

export default ContractorHomepage;