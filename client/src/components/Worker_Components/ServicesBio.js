import React, { Component } from 'react';
import axios from 'axios'

class ServicesBio extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            bio: ''
        }
    }

    componentDidMount() { 
        console.log(this.props.user)
        const jsonName = { user: this.props.user }
        axios.post('http://localhost:5000/users/getBio', jsonName)
            .then(response => { 
                console.log(response)
                this.setState({bio: response.data[0].bio})
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div className="text-center" style={{paddingLeft:"20px", paddingRight: "20px"}}>
                {this.state.bio}
            </div>
        );
    }
}

export default ServicesBio;