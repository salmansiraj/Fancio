import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import './app.css'

class SocialButtons extends Component {
    render() {
        return (
          <div style={{textAlign: "center", padding: "10px"}}>
            <a
              href="https://www.facebook.com/"
              className="facebook social"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a
              href="https://www.instagram.com/"
              className="instagram social"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://www.linkedin.com/"
              className="linkedin social"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        );
    }
}

export default SocialButtons;