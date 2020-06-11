import React, { Component } from "react";
import { Card } from "reactstrap";
import ContractorNavbar from "./ContractorNavbar";
import ContractorApptCard from "./ContractorApptCard";

class ContractorSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      worker_username: "",
      contractor_username: "",
      description: "",
      location: "",
      date: new Date(),
      accepted_appts: [],
      answer: "",
    };
  }

  onSubmit = (e) => {
    this.setState({
      answer: e.target.name,
    });
  };

  render() {
    console.log(this.props)
    return (
      <Card style={{ borderRadius: "25px" }}>
        <ContractorNavbar name={this.props.match.params.name} />
        <ContractorApptCard name={this.props.match.params.name} />
      </Card>
    );
  }
}

export default ContractorSchedule;
