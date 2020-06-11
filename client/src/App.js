import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Components
import Login from "./components/Login";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import WorkerHomepage from "./components/Worker_Components/WorkerHomepage";
import CreateAppointment from "./components/Worker_Components/CreateAppointment";
import WorkerSchedule from "./components/Worker_Components/WorkerSchedule";

import ContractorHomepage from "./components/Contractor_Components/ContractorHomepage";
import CreateService from "./components/Contractor_Components/CreateService"
import ContractorSchedule from "./components/Contractor_Components/ContractorSchedule";


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

          <Route path="/workerHomepage/:name" exact component={WorkerHomepage} />
          <Route path="/contractorHomepage/:name" exact component={ContractorHomepage} />

          <Route path="/create/:name" exact component={CreateService} />

          <Route path="/create-appointment/:name" exact component={CreateAppointment} />
          <Route path="/get-contractor-schedule/:name" exact component={ContractorSchedule} />
          <Route path="/get-worker-schedule/:name" exact component={WorkerSchedule} />


        </Router>
      </div>
    );
  }
}
