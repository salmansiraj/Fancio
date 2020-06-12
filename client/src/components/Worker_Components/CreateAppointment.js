import React, { Component } from 'react';
import axios from 'axios';
import WorkerNavbar from "./WorkerNavbar";
import service from '../../assets/service.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from 'reactstrap';

export default class CreateAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
        worker_username: '',
        contractor_username: '',
        description: '',
        location: '',
        date: new Date(),
        workers: [],
        contractors: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
            const workers = response.data.filter(user => user.user_type === "Worker");
            const contractors = response.data.filter(user => user.user_type === "Contractor");

            this.setState({
                workers: workers.map(user => user.username),
                contractors: contractors.map(user => user.username),
                // users: response.data.map(user => user.username + " (" + user.user_type + ")"),
                // username: response.data[0].username
                worker_username: workers[0].username,
                contractor_username: contractors[0].username
            })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeWorkerUsername = (e) => {
    console.log(e);
    this.setState({
    worker_username: e.target.value
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
      worker_username: this.state.worker_username,
      contractor_username: this.props.location.pathname.split("/").pop(),
      description: this.state.description,
      location: this.state.location,
      date: this.state.date
    }

    console.log("worker side", appointment);

    axios.post('http://localhost:5000/appointments/add', appointment)
      .then(res => console.log(res.data));

    // window.location = '/workerHomepage/' + this.state.worker_username;
  }

  render() {
    return (
      <Card style={{ borderRadius: "20px" }}>
        <div className="container">
          <WorkerNavbar />
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
                value={this.state.worker_username}
                onChange={this.onChangeWorkerUsername}>
                {
                  this.state.workers.map(function (worker) {
                    return <option
                      key={worker}
                      value={worker}>{worker}{}
                    </option>
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
              <label> Pickup Location: </label>
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