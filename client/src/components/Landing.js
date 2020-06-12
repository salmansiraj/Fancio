import React, { Component } from "react";

// Assets
import logo from "../assets/loginlogo.png";
import work_site from "../assets/work_site.jpg";
import builder from "../assets/builder.png"
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
          <br />
          <div className="text-center">
            <img
              src={logo}
              style={{
                width: "270px",
                height: "90px",
              }}
              alt=""
            />
            <img
              src={builder}
              style={{
                width: "90px",
                height: "90px",
              }}
              alt=""
            />
          </div>
          <br />
          <div class="card-block text-center">
            <p class="card-text text-muted" style={{ padding: "20px", webkitFontSmoothing:"antialiased" }}>
              Fancio connects skilled
              <b style={{ color: "#588498" }}> labor workers </b> to
              <b style={{ color: "#588498" }}> contractors </b>
              <br />
              <br />
              The goal at <b style={{ color: "#588498" }}>Fancio </b> is to
              bridge a friendly connection, and to provide a{" "}
              <b style={{ color: "#588498" }}> platform tailored </b>
              for those struggling in the intensive labor industry
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
            src={work_site}
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
