import React, { Component } from 'react';
import { Card } from 'reactstrap';
import axios from "axios";
import calendar from '../assets/calendar.png'

class ClientApptCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: []
        }
    }

    componentDidMount() {
        axios.post('http://localhost:5000/appointments/get-client-schedule/' + this.props.name)
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
                <h1>
                    <img src={calendar} style={{ marginLeft: "20px", padding: "10px" }} width="100" height="100" alt="" />
                    Upcoming Appointments
                </h1><br />

                <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
                    {
                        this.state.appointments.map(appt => {
                            return (
                                <Card body style={{
                                    margin: "10px", borderRadius: "25px", width: "33.33%", backgroundColor: "#3b6597" }}>
                                    <p className="text-center" style={{ marginBottom: "15px", color: "white" }}>
                                        Your Appointment with
                                    </p>
                                    <h1 className="text-center" style={{ marginBottom: "15px", color: "white" }}> 
                                        {appt.stylist_username} 
                                    </h1>
                                    <Card style={{ borderRadius: "25px" }}>
                                        <p className="text-center text-muted" style={{ marginTop: "15px" }}>
                                            <h6 >
                                                Your Appointment Date
                                            </h6>
                                            <p style={{ marginBottom: "15px" }}> {appt.date.substring(0, 10)}  </p>

                                        </p>
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

export default ClientApptCard;