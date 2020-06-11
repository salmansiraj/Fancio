import React, { Component } from 'react';
import { Card } from 'reactstrap';
import axios from "axios";
import calendar from '../../assets/calendar.png'
import Profile from "../Profile";

class ContractorApptCard extends Component {
    constructor(props) { 
        super(props);
        this.state = { 
            appointments: [],
            phone_number: ''
        }
    }

    componentDidMount() { 
        axios.post('http://localhost:5000/appointments/get-contractor-schedule/' + this.props.name)
            .then(response => { 
                this.setState({appointments: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sendMessage = (user) => { 
        console.log(user);
        axios.post("http://localhost:5000/appointments/send-message/" + user)
            .then((response) => { 
                console.log("Message succcessfully sent");
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
                    My Schedule 
                </h1><br />

                <div className="container" style={{display:"flex", flexWrap: "wrap"}}> 
                    {
                        this.state.appointments.map(appt => {
                            return (
                              <Card
                                className="shadow p-3 mb-5 bg-white rounded"
                                style={{
                                  margin: "5px",
                                  borderRadius: "25px",
                                  width: "33%",
                                  backgroundColor: "#3b6597",
                                }}
                              >
                                <p className="text-center">
                                    Your Appointment with
                                </p>
                                <h2
                                  className="text-center"
                                  style={{ marginBottom: "5px" }}
                                >
                                  {appt.worker_username}
                                </h2>
                                <Profile user={appt.worker_username} />
                                <p
                                  className="text-center font-weight-light"
                                  style={{ marginTop: "15px" }}
                                >
                                  <h6 className="text-muted">
                                    Appointment Date
                                  </h6>
                                  <p style={{ marginBottom: "15px" }}>
                                    {" "}
                                    {appt.date.substring(0, 10)}{" "}
                                  </p>

                                  <h6 className="text-muted">Inquiry</h6>
                                  {appt.description}

                                  <br />
                                  <br />
                                </p>
                              </Card>
                            );
                        })
                    }
                </div>
            </div>
            
        );
    }
}

export default ContractorApptCard;