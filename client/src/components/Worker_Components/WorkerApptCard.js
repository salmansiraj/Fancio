import React, { Component } from 'react';
import { Card } from 'reactstrap';
import axios from "axios";
import calendar from '../../assets/calendar.png'
import Profile from '../Profile'

class WorkerApptCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: []
        }
    }

    componentDidMount() {
        axios.post('http://localhost:5000/appointments/get-worker-schedule/' + this.props.name)
            .then(response => {
                this.setState({ appointments: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        return (
            <div className="container">
                <h2 style={{ color: "#477884" }}>
                    <img src={calendar} style={{ marginLeft: "20px", padding: "10px" }} width="100" height="100" alt="" />
                    Upcoming Appointments
                </h2>

                <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
                    {
                        this.state.appointments.map(appt => {
                            return (

                                <Card body
                                    className="shadow p-3 mb-5 bg-white rounded"
                                    style={{
                                        margin: "5px",
                                        borderRadius: "25px",
                                        maxWidth: "33%",
                                        backgroundColor: "#3b6597",
                                    }}
                                >
                                    <p className="text-center">
                                        Your Appointment with
                                    </p>
                                    <h1 className="text-center" style={{ marginBottom: "15px"}}> 
                                        {appt.contractor_username} 
                                    </h1>
                                    <Profile user={appt.contractor_username}/>
                                    <br />
                                    <Card className="text-center text-muted">
                                        <h6 style={{ marginTop: "15px" }}> Your Appointment Date </h6>
                                        <p style={{ marginBottom: "15px" }}> {appt.date.substring(0, 10)}  </p>
                                    </Card>

                                </Card>
                            )
                        })
                    }
                </div>
            </div>

        );
    }
}

export default WorkerApptCard;