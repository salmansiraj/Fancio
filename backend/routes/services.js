const router = require("express").Router()
let Service = require("../models/service.model")


// Get all services
router.route("/").get((req, res) => {
  Service.find()
    .then((services) => res.json(services))
    .catch((err) => res.status(400).json("Error: " + err))
})

// Adding a service
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const location = req.body.location;
  const service_type = req.body.service_type;
  const pay_rate = req.body.pay_rate;

  const newService = new Service({
    username,
    location,
    service_type,
    pay_rate,
  });

  newService
    .save()
    .then(() => res.json("Service added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

