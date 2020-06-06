const router = require("express").Router();
const twilio = require("twilio");

//twilio requirements -- Texting API
const accountSid = process.env.ACC_SID
const authToken = process.env.AUTH_TOKEN
const client = new twilio(accountSid, authToken);

// DB objects 
let Appointment = require('../models/appointment.model')
let User = require('../models/user.model')