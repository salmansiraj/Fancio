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
        console.log(this.props)
        return (
          <div className="text-center">
                {this.props.homepage === false ?
                    (<Image
                        src={this.state.url}
                        thumbnail
                        style={{
                            width: "100px",
                            height: "100px",
                            boxShadow: "10px",
                            filter: "drop-shadow(2px 4px 4px #477884)"
                        }} />)
                    :
                    (<Image
                        src={this.state.url}
                        roundedCircle
                        style={{
                            width: "100px",
                            height: "100px",
                            filter: "drop-shadow(2px 4px 4px #477884)"  
                        }} />
                    )
                }
          </div>
        );
    }
}

export default Profile;