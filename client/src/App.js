import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Components
import Login from "./components/Login";

export default class App extends Component {

  render() { 
    return (
      <div className="container">
        <br />
        <Router>
          <br />
          <Route path="/" exact component={Login} />
        
        </Router>
      </div>
  );
  }
}
