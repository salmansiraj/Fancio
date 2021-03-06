import React, { Component } from "react";
import axios from "axios";
import {storage} from '../firebase'

// Assets + Styling
import { Image, ProgressBar, Form, Button, Col } from "react-bootstrap";

import { FormGroup, Label, Input, Card } from "reactstrap";
import logo from '../assets/loginlogo.png';
import worker from '../assets/worker.png';

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
      bio: '',
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

  onChangeBio = (e) => {
    this.setState({
      bio: e.target.value
    });
  };



  onChangeUserType = (e) => {
    this.setState({
      user_type: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log('wtf')

    const user = {
      username: this.state.username,
      password: this.state.password, 
      user_type: this.state.user_type,
      phone_number: this.state.phone_number,
      url: this.state.url,
      bio: this.state.bio
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
      url: '', 
      bio: ''
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
                  className="text-center"
                  width="270"
                  height="90"
                  alt=""
                />
                <img
                  src={worker}
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
          
          <FormGroup>
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
              <Col>
                <Col>
                  <h6> Bio </h6>
                  <Input
                    required
                    type="textarea"
                    value={this.state.bio}
                    onChange={this.onChangeBio}
                    style={{ height: "100px" }}
                  />
                </Col>
                <br />
                <Col>
                  <h6> Phone Number </h6>
                  <Input
                    required
                    type="phone_number"
                    placeholder="415-555-5555"
                    value={this.state.phone_number}
                    onChange={this.onChangePhoneNumber}
                  />
                </Col>
              </Col>
            </Form.Row>
            <br />
          </FormGroup>
          <FormGroup>
            <h5 className="text-center" style={{ paddingLeft: "10px" }}>
              {" "}
              Select User Type{" "}
            </h5>
            <fieldset
              className="form-check text-center"
              onChange={this.onChangeUserType}
            >
              <Label
                className="form-check-label"
                for="exampleRadios1"
                style={{ paddingRight: "30px" }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  value="Worker"
                  checked={this.state.user_type === "Worker"}
                  required
                />
                Worker
              </Label>

              <Label className="form-check-label" for="exampleRadios2">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Contractor"
                  style={{ paddingLeft: "30px" }}
                  checked={this.state.user_type === "Contractor"}
                />
                Contractor
              </Label>
            </fieldset>
          </FormGroup>
          <Button
            className="btn-lg btn-block"
            style={{
              opacity: "1",
              backgroundColor: "#477884",
            }}
            onClick={this.onSubmit}
          >
            Signup
          </Button>
          
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