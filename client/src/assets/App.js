import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import ServicesList from "./components/ServicesList";

import EditExercise from "./components/EditExercises";
import EditService from "./components/EditService";

import CreateExercise from "./components/CreateExercise";
import CreateService from "./components/CreateService";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ClientHomepage from "./components/ClientHomepage";
import StylistHomepage from "./components/StylistHomepage";
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import CreateAppointment from "./components/CreateAppointment";
import Schedule from "./components/Schedule";
import ClientSchedule from "./components/ClientSchedule";
import './App.css';

// Icons made by flaticon.com - Author: Freepik

export default class App extends Component {
  constructor(props) { 
    super(props);

    this.getUser = this.getUser.bind(this);

    this.state = {
      username: '',
      password: '',
      user_type: ''
    }
  }

  getUser(username, password, user_type) { 
    this.setState({
      username: username,
      password: password,
      user_type: user_type
    });
    console.log("State changed: ", this.state);
  }

  
  render() { 
    return (
      <div className="container">
        <br />
        <Router>
          <br />
          <Route path="/" exact component={Login} />

          <Route path="/clientHomepage/:name" exact component={ClientHomepage} />
          <Route path="/stylistHomepage/:name" exact component={StylistHomepage} />

          <Route path="/edit/:id" exact component={EditService} />
          <Route path="/create/:name" exact component={CreateService} />
          <Route path="/sign-up" exact component={Signup} />

          <Route path="/create-appointment" exact component={CreateAppointment} />
          <Route path="/get-schedule/:name" exact component={Schedule} />
          <Route path="/get-client-schedule/:name" exact component={ClientSchedule} />
        </Router>
      </div>
    );
  }
}
