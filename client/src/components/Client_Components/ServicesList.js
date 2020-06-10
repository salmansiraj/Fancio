import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import hairdresser from '../../assets/hairdresser.png';
import { Button } from 'reactstrap';

const Service = props => (
  <tr>
    <td>{props.service.username}</td>
    <td>{props.service.location}</td>
    <td>{props.service.service_type}</td>
    <td>{"$" + props.service.pay_rate}</td>
    <td>
      <Link to={"/create-appointment/" + props.service.username}>
        <Button style={{ backgroundColor: "cadetblue" }}>
            Request
        </Button>
      </Link>

    </td>
  </tr>
)

export default class ServicesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        services: [],
        client_appointments: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/services/')
      .then(response => { 
          this.setState({ services: response.data })
      })
      .catch((err) => console.log(err));

      console.log(this.props);
      // Get Clients Accepted appointments
    axios.post('http://localhost:5000/appointments/client', this.props)
      .then(response => {
        this.setState({ client_appointments: response.data });
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
          <Button color="info" onClick={() => { window.location = "/get-client-schedule/" + this.props.user }}>
            <a style={{ color: "white" }}
            >
              My Schedule
                </a>
          </Button>
      );
  }

  render() {
    return (
      <div className="container">
        <h3> 
          <img src={hairdresser} style={{ padding: "15px" }} width="100" height="100" alt="" />
          All Services
          <span style={{float:"right"}}> {this.submitButton()} </span>
        </h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Stylist Username</th>
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