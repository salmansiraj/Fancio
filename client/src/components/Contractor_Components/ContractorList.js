import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import workerTwo from '../../assets/workerTwo.png';
import { Button } from 'reactstrap';
import ServicesBio from "../Worker_Components/ServicesBio";
import Profile from '../Profile'
import SocialButtons from '../SocialButtons'
import { Card } from 'react-bootstrap'

const Appointment = props => (
    <tr>
        <td>
            <Button href="#popup1" value="Result" style={{ backgroundColor: "steelblue"}}
            >
                {props.appointment.worker_username}
            </Button>
            <div id="popup1" class="overlay">
                <div class="popup">
                    <Card
                        class="cardProfile"
                        style={{
                        height: "50%",
                        borderBottomLeftRadius: "20%",
                        borderBottomRightRadius: "20%",
                        }}
                    >
                        <h2>
                        <Profile user={props.appointment.worker_username} />
                        {props.appointment.worker_username}
                        </h2>
                        <a class="close" href="">
                        &times;
                        </a>
                        <SocialButtons />
                    </Card>
                    <h3 class="text-center"> Bio </h3>
                    <ServicesBio user={props.appointment.worker_username} />
                </div>
            </div>
        </td>
        <td>{props.appointment.description}</td>
        <td>{props.appointment.location}</td>
        <td>{props.appointment.date.substring(0, 10)} </td>
        <td>
            <Link to={"/get-contractor-schedule/" + props.appointment.contractor_username}>
                <Button style={{ backgroundColor: "cadetblue" }}>
                    <a style={{ color: "white" }}
                        onClick={() => {
                            props.acceptAppointment(props.appointment);
                        }}
                    >
                        Accept
                </a>
                </Button>
            </Link>

            <Button style={{ backgroundColor: "#dd3444", margin: "15px" }}>
                <a style={{ color: "white" }}
                    onClick={() => {
                        props.deleteAppointment(props.appointment._id);
                    }}
                >
                    Decline
                </a>
            </Button>
        </td>
    </tr>
)

export default class WorkersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: []
        };
    }

    componentDidMount() {
        axios.post('http://localhost:5000/appointments/user', this.props)
            .then(response => {
                this.setState({ appointments: response.data })
            })
            .catch((err) => console.log(err));
    }

    currentUser = () => {
      return window.location.pathname.split("/").pop();
    };

    deleteAppointment = (id) => {
        axios.delete('http://localhost:5000/appointments/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            appointments: this.state.appointments.filter(el => el._id !== id)
        })
    }

    acceptAppointment = (appointment) => { 
        axios.post('http://localhost:5000/appointments/accepted', appointment)
            .then(res => { 
                console.log(res.data)
            });
        
        this.setState({
            appointments: this.state.appointments.filter(el => el.accepted === false)
        })
    }

    appointmentList = () => {
        return this.state.appointments.map(currentappointment => {
            return <Appointment appointment={currentappointment} deleteAppointment={this.deleteAppointment} acceptAppointment={this.acceptAppointment} key={currentappointment._id} />;
        })
    }

    submitButton = () => {
        return (
            <Link to={"/get-contractor-schedule/" + this.currentUser()}>
                <Button style={{ backgroundColor: "steelblue" }}>
                    My Schedule
                </Button>
            </Link>
        );
    }

    render() {
        // console.log(this.props.props);
        return (
            <div className="container">
                <h3 style={{ color: "#477884"}}>
                    <img src={workerTwo} style={{ padding: "15px" }} width="100" height="100" alt="" />
                    Requested Appointments
                    <span style={{float:"right"}}> {this.submitButton()} </span>
                </h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th> Worker Username </th>
                            <th> Inquiry </th>
                            <th> Location </th>
                            <th> Date </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.appointmentList()}
                    </tbody>
                </table>
            </div>
        )
    }
}