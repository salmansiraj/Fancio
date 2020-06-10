import React, { Component } from 'react';
import { Image } from "react-bootstrap";
import axios from "axios";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            url: ''
        }
    }

    componentDidMount() {
        axios.post('http://localhost:5000/users/getUser', this.props)
            .then(resp => {
                const responseURL = resp.data[0].url
                this.setState({ url: responseURL })
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
          <div className="text-center">
                <Image
                src={this.state.url}
                thumbnail
                style={{
                    width: "100px",
                    height: "100px",
                }}
                />
          </div>
        );
    }
}

export default Profile;