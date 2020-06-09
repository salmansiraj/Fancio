import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import { FacebookLoginButton } from 'react-social-login-buttons';
import axios from "axios";
import '../App.css';
import logo from '../assets/loginlogo.png';
import barber from '../assets/barber.png';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
      
    }
  }

  onChangeUsername = (e) => { 
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword = (e) => { 
    this.setState({
      password: e.target.value
    })
  }

  onSubmit = (e) => { 
    e.preventDefault();

    const user = { 
      username: this.state.username,
      password: this.state.password,

    }
  
    // console.log(user);

    axios.post("http://localhost:5000/users/login", user)
      .then((response) => {
        console.log("client side: ", response);
        if (response.data.length > 0) {

          // console.log("REQUEST ----- ", response.data[0]['user_type'])
          // this.props.getUser(
          //   response.data[0]['username'],
          //   response.data[0]['password'],
          //   response.data[0]['user_type']
          // );
          
          const currUser = response.data[0]['username'];
          const userType = response.data[0]['user_type']
          this.setState({
            username: '',
            password: ''
          });

          // Control where login will go to HERE ---
          if (userType === 'Client') { 
            window.location = "/clientHomepage/" + currUser;
            // return <Redirect from="/" to="/clientHomepage" />

          } else { 
            // - TODO --> Code up STYLIST SIDE 
            window.location = "/stylistHomepage/" + currUser;
          }

        }
        else {
          window.alert("User not present. Please sign up and try again!");
        }
      })
  }

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
                <img src={logo} clasName="text-center" width="250" height="100" alt="" />
                <img src={barber} style={{padding: "10px"}} width="100" height="100" alt="" />
                <br />
                Login
              </span>
            </h2>
          </div>

          <FormGroup>
            <Label> Username </Label>
            <Input 
              type="username" 
              placeholder="Username" 
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </FormGroup>

          <FormGroup>
            <Label> Password </Label>
            <Input 
              type="password" 
              placeholder="Password" 
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </FormGroup>

          <br />
          <Button 
            className="btn-lg btn-dark btn-block"
            style={{
              opacity:"1"
            }}
            >Login</Button>

          <div className="text-center pt-3">
            Or continue with your social account
          </div>

          <FacebookLoginButton className="mt-3 mb" />
          <br />

          <div className="text-center">
            <span className="p-2"> Are you a new user? </span>
            <a href="/sign-up"> Sign Up </a>
          </div>
        </Form>
      </Card>
    );
  }
}