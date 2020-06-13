import React, { Component } from 'react';
import axios from 'axios';
import ContractorNavbar from "./ContractorNavbar";
import "react-datepicker/dist/react-datepicker.css";
import service from '../../assets/service.png';
import { Card, Button } from 'reactstrap';

export default class CreateService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      location: '',
      service_type: '',
      pay_rate: '',
      users: [], 
      url: ''
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
              username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onChangeLocation = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  onChangeServiceType = (e) => {
    this.setState({
      service_type: e.target.value
    })
  }

  onChangePayRate = (e) => {
    this.setState({
      pay_rate: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const service = {
        username: this.props.location.pathname.split("/").pop(),
        location: this.state.location,
        service_type: this.state.service_type,
        pay_rate: this.state.pay_rate
    }

    console.log("worker side", service);

    axios.post('http://localhost:5000/services/add', service)
      .then(res => console.log(res.data));

    window.location = '/contractorHomepage/' + this.props.location.pathname.split("/").pop();
  }

  render() {
    console.log(this.props.location.pathname.split("/").pop())
    return (
      <Card style={{ borderRadius: "25px" }}>
        <div className="container">
          <ContractorNavbar user={this.props.location.pathname.split('/').pop()} homepage={true} />
          <br />
          <h2 style={{ color: "#477884" }}>
            <img src={service} style={{ padding: "10px" }} width="100" height="100" alt="" />
            Create New Service
          </h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label> Current location: </label>
              <input type="text"
                required
                className="form-control"
                value={this.state.location}
                onChange={this.onChangeLocation}
              />
            </div>
            <div className="form-group">
              <label> Service Type: </label>
              <input
                required
                type="text"
                className="form-control"
                value={this.state.service_type}
                onChange={this.onChangeServiceType}
              />
            </div>
            <div className="form-group">
              <label> Pay Rate: </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="$"
                value={this.state.pay_rate}
                onChange={this.onChangePayRate}
              />
            </div>

            <div className="form-group">
              <Button type="submit" value="Create Service" style={{ backgroundColor: "steelblue" }} >
              Create Service
            </Button>
            </div>
          </form>
        </div>
      </Card>
    )
  }
}