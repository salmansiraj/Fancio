import React, { Component } from 'react';
import { Card } from 'reactstrap';
import ClientNavbar from './ClientNavbar';
import ClientApptCard from './ClientApptCard';
import Chat from './ChatBot';


class ClientSchedule extends Component {
    constructor(props) { 
        super(props);

        this.state = { 
            client_username: '',
            stylist_username: '',
            description: '',
            location: '',
            date: new Date(),
            accepted_appts: [],
            answer: ''
        }
    }



    onSubmit = (e) => {
        this.setState({ 
            answer: e.target.name
        });
    }

    render() {
        return (
          <Card style={{ borderRadius: "25px" }}>
            <ClientNavbar name={this.props.match.params.name}/>
            <button
              name="yes"
              type="button"
              class="btn btn-dark"
              style={{ alignSelf: "flex-end", marginRight: "15px" }}
              onClick={this.onSubmit}
            >
              Message a Stylist
            </button>
            <ClientApptCard name={this.props.match.params.name} />
            <div style={{ alignSelf: "flex-end", marginRight: "5px" }}>
              {this.state.answer == "yes" && <Chat name={this.props.match.params.name}/> }
            </div>
          </Card>
        );
    }
}

export default ClientSchedule;