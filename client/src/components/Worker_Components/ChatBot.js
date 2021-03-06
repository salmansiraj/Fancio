import React, { Component } from 'react';
import Chat from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import axios from 'axios';

export default class ChatBot extends Component {
  constructor(props) {
    super(props);

    this.theme = {
      background: "##6197c0",
      fontFamily: "Arial",
      headerBgColor: "#6197c0",
      headerFontColor: "#fff",
      headerFontSize: "15px",
      botBubbleColor: "#6197c0",
      botFontColor: "#fff",
      userBubbleColor: "#6197c0",
      userFontColor: "#fff",
    };

    this.steps = [
      {
        id: "start",
        message:
          "Hey " +
          this.props.name +
          " . Which contractor would you like to message?",
        trigger: "contractorname",
      },
      {
        id: "contractorname",
        user: true,
        validator: (value) => {
          // const newMessage = this.state.message.push(value);
          this.setState({
            message: [...this.state.message, value],
          });
          return true;
        },
        trigger: "askformessage",
      },
      {
        id: "askformessage",
        message: "What would you like to send to {previousValue}?",
        trigger: "usermessage",
      },
      {
        id: "usermessage",
        user: true,
        validator: (value) => {
          window.message = value;
          //   const newMessage = this.state.message.push(value);
          this.setState({
            message: [...this.state.message, value],
          });
          return true;
        },
        trigger: "end",
      },
      {
        id: "end",
        component: (
          <button type="button" class="btn btn-dark" onClick={this.sendMessage}>
            Send Message
          </button>
        ),
        end: true,
      },
    ];

    this.state = {
      message: [],
      hidden: true
    };
  }

  sendMessage = () => {
    console.log(this.state.message);
    // Message to send to contractors phone
    axios.post("http://localhost:5000/appointments/send-message", this.state.message)   
      .then((response) => {
        console.log("Message succcessfully sent");
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ 
      hidden: false
    });

    alert("Message to "  + this.state.message[0] + " was sent!")
  };

  render() {
    return (
      <div>
        {this.state.hidden === true && (
          <ThemeProvider theme={this.theme}>
            <Chat
              headerTitle="Messenger Bot"
              recognitionEnable={true}
              steps={this.steps}
            />
          </ThemeProvider>
        )}
      </div>
    );
  }
}