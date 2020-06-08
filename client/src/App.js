import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Components
import Login from "./components/Login";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import ClientHomepage from "./components/Client_Components/ClientHomepage";
import CreateAppointment from "./components/Client_Components/CreateAppointment";
import ClientSchedule from "./components/Client_Components/ClientSchedule";

import StylistHomepage from "./components/Stylist_Components/StylistHomepage";
import CreateService from "./components/Stylist_Components/CreateService"
import StylistSchedule from "./components/Stylist_Components/StylistSchedule";


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user_type: ''
    }
  }

  getUser = (username, password, user_type) => { 
    this.setState({
      username: username,
      password: password,
      user_type: user_type
    });
    // console.log("State changed: ", this.state);
  }

  render() { 
    return (
      <div className="container">
        <br />
        <Router>
          <br />
          <Route path="/" exact component={Landing} />

          <Route path="/login" exact component={Login} />
          <Route path="/sign-up" exact component={Signup} />

          <Route path="/clientHomepage/:name" exact component={ClientHomepage} />
          <Route path="/stylistHomepage/:name" exact component={StylistHomepage} />

          <Route path="/create/:name" exact component={CreateService} />
          <Route path="/sign-up" exact component={Signup} />

          <Route path="/create-appointment" exact component={CreateAppointment} />
          <Route path="/get-schedule/:name" exact component={StylistSchedule} />
          <Route path="/get-client-schedule/:name" exact component={ClientSchedule} />


        </Router>
      </div>
    );
  }
}
