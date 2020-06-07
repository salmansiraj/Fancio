import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Card } from "reactstrap";
import { FacebookLoginButton } from "react-social-login-buttons";
import axios from "axios";
import logo from '../assets/loginlogo.png';
import barber from '../assets/barber.png';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      user_type: '',
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onChangeUserType = (e) => {
    this.setState({
      user_type: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password, 
      user_type: this.state.user_type
    }

    console.log(user);

    axios.post("http://localhost:5000/users/sign-up", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: '',
      password: '', 
      user_type: ''
    })

    window.location = '/login';
  };

  render() {
    return (
      <Card style={{ borderRadius: "25px" }}>
        <Form
          className="login-form"
          style={{ padding: "25px", borderRadius: "25px" }}
          onSubmit={this.onSubmit}
        >
          <div>
            <h2 className="text-center">
              <span className="font-weight-bold">
                <img src={logo} class="text-center" width="250" height="100" alt="" />
                <img src={barber} style={{ padding: "10px" }} width="100" height="100" alt="" />
                <br />
                Sign Up
              </span>
            </h2>
          </div>

          <FormGroup>
            <Label> Username </Label>
            <Input 
              required
              type="username" 
              placeholder="Username" 
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </FormGroup>

          <FormGroup>
            <Label> Password </Label>
            <Input 
              required
              type="password" 
              placeholder="Password" 
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </FormGroup>

          <FormGroup>
            <h5 className="text-center" style={{ paddingLeft: "10px" }}> Select User Type </h5>
            <fieldset class="form-check text-center" onChange={this.onChangeUserType}>

              <Label
                class="form-check-label"
                for="exampleRadios1"
                style={{ paddingRight: "30px" }}
              >
                <input
                  class="form-check-input"
                  type="radio"
                  value="Client"
                  checked={this.state.user_type === "Client"}
                  required
                />
                Client
              </Label>

              <Label class="form-check-label" for="exampleRadios2">
                <input
                  class="form-check-input"
                  type="radio"
                  value="Stylist"
                  style={{ paddingLeft: "30px" }}
                  checked={this.state.user_type === "Stylist"}
                />
                Stylist
              </Label>

            </fieldset>
          </FormGroup>

          <br />
          <div className="form-group"> 
            <input
              className="btn-lg btn-dark btn-block"
              value="Signup"
              type="submit"
            />
          </div>

          <div className="text-center pt-3">
            Or continue with your social account
          </div>

          <FacebookLoginButton className="mt-3 mb" />
          <br />

          <div className="text-center">
            <span className="p-2"> Already a user? </span>
            <a href="/login"> Login </a>
          </div>
        </Form>
      </Card>
    );
  }
}