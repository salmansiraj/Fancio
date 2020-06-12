import React, { Component } from 'react';
import { Card } from 'reactstrap';
import Image from 'react-bootstrap/Image'
import WorkerNavbar from './WorkerNavbar';
import WorkerApptCard from './WorkerApptCard';
import Chat from './ChatBot';
import '../app.css'
import chatImage from '../../assets/chatImage.png'


class WorkerSchedule extends Component {
    constructor(props) { 
        super(props);

        this.state = { 
            worker_username: '',
            contractor_username: '',
            description: '',
            location: '',
            date: new Date(),
            accepted_appts: [],
            answer: ''
        }
    }



    onSubmit = (name) => {
        this.setState({ 
            answer: name
        });
    }

    render() {
        return (
          <Card style={{ borderRadius: "25px" }}>
            <WorkerNavbar name={this.props.match.params.name} />
            <br />
            <Image
              className="chatImg"
              src={chatImage}
              onClick={() => this.onSubmit("yes")}
            />
            <WorkerApptCard name={this.props.match.params.name} />
            <div style={{ alignSelf: "flex-end", marginRight: "5px" }}>
              {this.state.answer === "yes" && (
                <Chat name={this.props.match.params.name} />
              )}
            </div>
          </Card>
        );
    }
}

export default WorkerSchedule;