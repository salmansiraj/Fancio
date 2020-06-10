import React, { Component } from "react";

// Assets
import logo from "../assets/loginlogo.png";
import hair_salon from "../assets/hair_salon.jpg";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Landing extends Component {
  onSubmit = () => {
    window.location = "/login";
  };
  render() {
    return (
      <div class="card-group">
        <div class="card">
          <img
            src={logo}
            style={{
              width: "250px",
              height: "100px",
              alignSelf: "center",
            }}
            alt=""
          />
          <br />
          <div class="card-block text-center">
            <p class="card-text text-muted" style={{ padding: "20px" }}>
              Fancio connects clients with{" "}
              <b style={{ color: "#588498" }}> freelance stylists </b> or any
              type of stylist who wants to promote themselves.
              <br />
              <br />
              The goal at <b style={{ color: "#588498" }}>Fancio </b> is to{" "}
              <b style={{ color: "#588498" }}>
                bridge a friendly connection between stylists and their clients
              </b>{" "}
              , and to provide stylists a platform that is tailored for them
            </p>
            <Button
              type="button"
              className="btn-lg btn-info"
              onClick={this.onSubmit}
            >
              Join Today!
            </Button>
            <p class="card-text">
              <br />
              <small class="text-muted">
                For any questions or concerns, email
                <a href="mailto: ss10298@nyu.edu"> salman@nyu.edu </a>
              </small>
            </p>
          </div>
        </div>
        <div class="card">
          <img
            src={hair_salon}
            class="text-center"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default Landing;
