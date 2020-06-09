import React, { Component } from 'react';
import axios from 'axios';
import ClientNavbar from "./ClientNavbar";
import service from '../../assets/service.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from 'reactstrap';

export default class CreateAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
        client_username: '',
        stylist_username: '',
        description: '',
        location: '',
        date: new Date(),
        clients: [],
        stylists: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
            const clients = response.data.filter(user => user.user_type === "Client");
            const stylists = response.data.filter(user => user.user_type === "Stylist");

            this.setState({
                clients: clients.map(user => user.username),
                stylists: stylists.map(user => user.username),
                // users: response.data.map(user => user.username + " (" + user.user_type + ")"),
                // username: response.data[0].username
                client_username: clients[0].username,
                stylist_username: stylists[0].username
            })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeClientUsername = (e) => {
    console.log(e);
    this.setState({
    client_username: e.target.value
    })
  }

  onChangeStylistUsername = (e) => {
    this.setState({
      stylist_username: e.target.value
    })
  }

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  onChangeLocation = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  onChangeDate = (date) => {
    this.setState({
      date: date
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const appointment = { 
        client_username: this.state.client_username,
        stylist_username: this.state.stylist_username,
        description: this.state.description,
        location: this.state.location,
        date: this.state.date
    }

    console.log("client side", appointment);

    axios.post('http://localhost:5000/appointments/add', appointment)
      .then(res => console.log(res.data));

    window.location = '/ClientHomepage/' + this.state.client_username;
  }

  render() {
    return (
      <Card style={{ borderRadius: "20px" }}>
        <div className="container">
          <ClientNavbar />
          <h3>
            <img src={service} style={{ padding: "10px" }} width="100" height="100" alt="" />
            Create Appointment
          </h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>My Username: </label>
              <select ref="userInput"
                required
                className="form-control"
                value={this.state.client_username}
                onChange={this.onChangeClientUsername}>
                {
                  this.state.clients.map(function (client) {
                    return <option
                      key={client}
                      value={client}>{client}{}
                    </option>
                  })

                }
              </select>
            </div>
            <div className="form-group">
              <label>Stylist Username: </label>
              <select ref="userInput"
                required
                className="form-control"
                value={this.state.stylist_username}
                onChange={this.onChangeStylistUsername}>
                {
                  this.state.stylists.map(function (user) {
                    return <option
                      key={user}
                      value={user}>{user}{}
                    </option>;
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <label> Inquiry: </label>
              <input type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>
            <div className="form-group">
              <label> Location: </label>
              <input
                required
                type="text"
                className="form-control"
                value={this.state.location}
                onChange={this.onChangeLocation}
              />
            </div>
            <div className="form-group">
                <label>Date: </label>
                <div>
                    <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    />
                </div>
            </div>
            <div className="form-group">
              <input type="submit" value="Setup Appointment" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </Card>
    )
  }
}