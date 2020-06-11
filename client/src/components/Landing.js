import React, { Component } from "react";

// Assets
import logo from "../assets/loginlogo.png";
import work_site from "../assets/work_site.jpg";
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
              width: "270px",
              height: "90px",
              alignSelf: "center",
            }}
            alt=""
          />
          <br />
          <div class="card-block text-center">
            <p class="card-text text-muted" style={{ padding: "20px" }}>
              Jobot connects skilled
              <b style={{ color: "#588498" }}> labor workers </b> to
              <b style={{ color: "#588498" }}> contractors </b>
              <br />
              <br />
              The goal at <b style={{ color: "#588498" }}>Jobot </b> is to
                bridge a friendly connection, and to provide a platform that is tailored for both ends
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
