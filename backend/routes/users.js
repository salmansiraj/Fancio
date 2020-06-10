const router = require('express').Router()

// Model object for user DB 
let User = require('../models/user.model')

// GET all users in DB 
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get specific user
router.route("/getUser").post((req, res) => {
  User.find({ username: req.body.user })
    .then(response => {
        res.json(response)
    })
    .catch((err) => res.status(400).json("Error: " + err));
})


// POST user to the user database
router.route('/add').post((req, res) => { 
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

// GET all users in the database via LOGIN 
router.route('/login').post((req, res) => { 
    const username = req.body.username;
    const password = req.body.password;

    User.find( { "username": username, "password": password } )
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

// POST new user to application from SIGN UP
router.route('/sign-up').post((req, res) => {
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;
    const user_type = req.body.user_type;
    const phone_number = "+1" + req.body.phone_number.replace(/-/g, ''); // Adding later
    const url = req.body.url

    const newUser = new User({ username, password, user_type, phone_number, url });
    console.log("newUser backend creation", newUser);

    if (user_type === 'Client') {
        newUser.save()
            .then(() => res.json('Client added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        newUser.save()
            .then(() => res.json('Stylist added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});



// Standard export
module.exports = router;