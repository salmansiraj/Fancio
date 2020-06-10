import React, { Component } from "react";
import axios from "axios";
import {storage} from '../firebase'

// Assets + Styling
import { Image, ProgressBar, Form, Button, Col } from "react-bootstrap";

import { FormGroup, Label, Input, Card } from "reactstrap";
import logo from '../assets/loginlogo.png';
import barber from '../assets/barber.png';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.defaultProfile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    this.state = {
      username: "",
      password: "",
      user_type: "",
      phone_number: "",
      image: null,
      url: '',
      progress: 0
    };
  }

  handleProfileChange = (e) => { 
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ 
        image
      }));
    }
  }

  handleProfileUpload = () => {
    if (this.state.image) { 
      const {image} = this.state;
      const uploadTask = storage.ref(`Desktop/${image.name}`).put(image);
      uploadTask.on('state_changed', 
        (snapshot) => {
          // progress function 
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({progress});
        }, 
        (error) => {
            // error function 
          console.log(error)
        }, 
      () => {
          // complete function
          storage.ref('Desktop').child(image.name).getDownloadURL()
            .then(url => {
                console.log(url)
                this.setState({ 
                  url, 
                  progress : 0
                })
      
            })
      });

    } else {
      alert('Error: Image not uploaded. Please try again!')
    }
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangePassword = (e) => {
    console.log(e.target.value)
    this.setState({
      password: e.target.value,
    });
  };

  onChangePhoneNumber= (e) => {
    this.setState({
      phone_number: e.target.value,
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
      user_type: this.state.user_type,
      phone_number: this.state.phone_number,
      url: this.state.url
    }

    if (this.state.url === '') { 
      user.url = this.defaultProfile
    }

    console.log(user);

    axios.post("http://localhost:5000/users/sign-up", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: '',
      password: '', 
      user_type: '',
      image: '',
      url: ''
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
                <img
                  src={logo}
                  class="text-center"
                  width="250"
                  height="100"
                  alt=""
                />
                <img
                  src={barber}
                  style={{ padding: "10px" }}
                  width="100"
                  height="100"
                  alt=""
                />
                <br />
                Sign Up
              </span>
            </h2>
          </div>
          <br />
          <Form.Row style={{ margin: "10px" }}>
            <Col style={{ textAlign: "-webkit-center" }}>
              <h6> Profile Picture </h6>
              <Image
                src={this.state.url || this.defaultProfile}
                roundedCircle
                style={{
                  width: "150px",
                  height: "150px",
                  marginBottom: "20px",
                }}
              />
              <br />
              <input type="file" onChange={this.handleProfileChange} />
              <Button variant="info" onClick={this.handleProfileUpload}>
                Upload
              </Button>
              {this.state.progress > 0 && (
                <ProgressBar
                  animated
                  now={this.state.progress}
                  style={{ width: "60%", marginTop: "10px" }}
                  label={`${this.state.progress}%`}
                />
              )}
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <h6>Username</h6>
              <Input
                required
                type="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </Col>
            <Col>
              <h6> Password </h6>
              <Input
                required
                type="password"
                placeholder="••••••"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </Col>
          </Form.Row>
          <br />

          <FormGroup>
            <h6> Phone Number </h6>
            <Input
              required
              type="phone_number"
              placeholder="415-555-5555"
              value={this.state.phone_number}
              onChange={this.onChangePhoneNumber}
            />
          </FormGroup>

          <FormGroup>
            <h5 className="text-center" style={{ paddingLeft: "10px" }}>
              {" "}
              Select User Type{" "}
            </h5>
            <fieldset
              class="form-check text-center"
              onChange={this.onChangeUserType}
            >
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

          <div className="text-center">
            <span className="p-2"> Already a user? </span>
            <a href="/login"> Login </a>
          </div>
        </Form>
      </Card>
    );
  }
}