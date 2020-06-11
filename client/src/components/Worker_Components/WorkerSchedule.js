import React, { Component } from 'react';
import { Card } from 'reactstrap';
import WorkerNavbar from './WorkerNavbar';
import WorkerApptCard from './WorkerApptCard';
import Chat from './ChatBot';


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



    onSubmit = (e) => {
        this.setState({ 
            answer: e.target.name
        });
    }

    render() {
        return (
          <Card style={{ borderRadius: "25px" }}>
            <WorkerNavbar name={this.props.match.params.name}/>
            <br /><br />  
            <button
              name="yes"
              type="button"
              className="btn btn-dark"
              style={{ alignSelf: "flex-end", marginRight: "15px" }}
              onClick={this.onSubmit}
            >
              Message a Contractor
            </button>
            <WorkerApptCard name={this.props.match.params.name} />
            <div style={{ alignSelf: "flex-end", marginRight: "5px" }}>
              {this.state.answer === "yes" && <Chat name={this.props.match.params.name}/> }
            </div>
          </Card>
        );
    }
}

export default WorkerSchedule;