import React, { Component } from "react";
import { Card } from "reactstrap";
import StylistNavbar from "./StylistNavbar";
import StylistApptCard from "./StylistApptCard";

class StylistSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client_username: "",
      stylist_username: "",
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
        <StylistNavbar name={this.props.match.params.name} />
        <StylistApptCard name={this.props.match.params.name} />
      </Card>
    );
  }
}

export default StylistSchedule;
