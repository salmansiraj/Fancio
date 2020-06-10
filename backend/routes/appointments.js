const router = require("express").Router();
const twilio = require("twilio");

//twilio requirements -- Texting API
const accountSid = process.env.ACC_SID
const authToken = process.env.AUTH_TOKEN
const client = new twilio(accountSid, authToken);

// DB objects 
let Appointment = require('../models/appointment.model')
let User = require('../models/user.model')

// Get appointments of a Stylist
router.route("/user").post((req, res) => {
    console.log(req.body.user)
    const currUser = req.body.user;
    Appointment.find({ stylist_username: currUser, accepted: false })
        .then((appointments) => res.json(appointments))
        .catch((err) => res.status(400).json("Error: " + err));
})

// Get accepted appointments of a client 
router.route("/client").post((req, res) => {
    console.log(req)
    const currUser = req.body.props;
    Appointment.find({ client_username: currUser, accepted: true })
        .then((appointments) => res.json(appointments))
        .catch((err) => res.status(400).json("Error: " + err));
})

// Stylist accepting an appointment action 
router.route('/accepted').post((req, res) => { 
    // console.log("BACKEND accept -- ", req.body);
    const client_username = req.body.client_username;
    const stylist_username = req.body.stylist_username;
    const description = req.body.description;
    const location = req.body.location;
    const date = req.body.date;
    const accepted = true;

    const newAppointment = new Appointment({
        client_username,
        stylist_username,
        description,
        location,
        date,
        accepted
    });


    Appointment.findOneAndDelete(req.body)
        .then(() => {
            newAppointment.save()
                .then(() => res.json('Appointment IS ON SCHEDULE'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

// DELETE an appointment from Stylist side
router.route('/:id').delete((req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Appointment deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Adding appointment to stylists accepted appt list 
router.route('/addAppt').post((req, res) => {
    // console.log("BACKEND", req.body);
    const stylist_username = req.body.stylist_username;

    User.find( { "username" : stylist_username } )
        .then(response => {
            response[0]["accepted_appts"].push(req.body)
            response[0].save()
                .then(() => res.json('Appointment added!'))
                .catch(err => res.status(400).json('Error: ', err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Adding an appointment from Client side
router.route('/add').post((req, res) => {
    const client_username = req.body.client_username;
    const stylist_username = req.body.stylist_username;
    const description = req.body.description;
    const location = req.body.location;
    const date = req.body.date;

    const newAppointment= new Appointment({
        client_username,
        stylist_username,
        description,
        location,
        date
    });

    newAppointment.save()
        .then(() => res.json('Appointment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET All Accepted appointments from Stylist
router.route('/get-stylist-schedule/:name').post((req, res) => {
    // const stylist_username = req.body.username;
    // console.log("BACKEND -- ", req.params.name);
    Appointment.find( { "stylist_username" : req.params.name } )
        .then ((data => { 
            console.log(data)
            res.json(data);
        }))
        .catch((err) => res.status(400).json("Error: " + err))
});

// Send message via twilio 
router.route('/send-message').post((req, res) => { 
    console.log("BACKEND --", req.body);
    const client_username = req.body[0];
    const message = req.body[1];
    User.find( { "username": client_username })
        .then (data => { 
            const phone_number = data[0].phone_number;
            
            client.messages.create({ 
                body: message,
                to: phone_number,
                from: '+12029521470'
            }).then((message) => {
                console.log(message);
                res.json(message);
            })
        })
        .catch((err) => res.status(400).json("Error: " + err))
});

// GET All Accepted appointments from Client
router.route('/get-client-schedule/:name').post((req, res) => {
    // const stylist_username = req.body.username;
    // console.log("BACKEND -- ", req.params.name);
    Appointment.find({ "client_username": req.params.name })
        .then((data => {
            console.log(data)
            res.json(data);
        }))
        .catch((err) => res.status(400).json("Error: " + err))
});


module.exports = router;