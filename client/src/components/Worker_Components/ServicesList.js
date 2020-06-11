import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import workerTwo from '../../assets/workerTwo.png';
import { Button } from 'reactstrap';
import '../app.css'
import { Card } from 'react-bootstrap'
import Profile from '../Profile'
import SocialButtons from '../SocialButtons'
import ServicesBio from "./ServicesBio";

const Service = (props) => (
  <tr>
    <td>
      <a href="#popup1" value="Result" style={{color: "cadetblue"}}
      >
         {props.service.username}
      </a>
      <div id="popup1" class="overlay">
        <div class="popup">
          <Card
            class="cardProfile"
            style={{
              height: "50%",
              borderBottomLeftRadius: "20%",
              borderBottomRightRadius: "20%",
            }}
          >
            <h2>
              <Profile user={props.service.username} />
              {props.service.username}
            </h2>
            <a class="close" href="">
              &times;
            </a>
            <SocialButtons />
          </Card>
          <h3 class="text-center"> Bio </h3>
          <ServicesBio user={props.service.username} />
        </div>
      </div>
    </td>
    <td>{props.service.location}</td>
    <td>{props.service.service_type}</td>
    <td>{"$" + props.service.pay_rate}</td>
    <td>
      <Link to={"/create-appointment/" + props.service.username}>
        <Button style={{ backgroundColor: "steelblue" }}>Request</Button>
      </Link>
    </td>
  </tr>
);

export default class ServicesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        services: [],
        worker_appointments: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/services/')
      .then(response => { 
          this.setState({ services: response.data })
      })
      .catch((err) => console.log(err));

      console.log(this.props);
      // Get workers Accepted appointments
    axios.post('http://localhost:5000/appointments/worker', this.props)
      .then(response => {
        this.setState({ worker_appointments: response.data });
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  }

  deleteService(id) {
    axios.delete('http://localhost:5000/services/' + id)
      .then(response => { console.log(response.data)});

    this.setState({
      services: this.state.services.filter(el => el._id !== id)
    })
  }

  serviceList = () => {
    return this.state.services.map(currentservice => {
      return <Service service={currentservice} key={currentservice._id}/>;
    })
  }

  submitButton = () => {
      return (
          <Button style={{ backgroundColor: "steelblue"}} onClick={() => { window.location = "/get-worker-schedule/" + this.props.user }}>
              My Schedule
          </Button>
      );
  }

  render() {
    return (
      <div className="container">
        <h3 style={{ color: "#477884" }}> 
          <img src={workerTwo} style={{ padding: "15px" }} width="100" height="100" alt="" />
          All Services
          <span style={{float:"right"}}> {this.submitButton()} </span>
        </h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Contractor Username</th> 
              <th>Location</th>
              <th>Service Type</th>
              <th>Pay Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.serviceList() }
          </tbody>
        </table>
      </div>
    )
  }
}