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
  })

  newService
    .save()
    .then(() => res.json("Service added!"))
    .catch((err) => res.status(400).json("Error: " + err));
})

// Get service by ID 
router.route('/:id').get((req, res) => {
    Service.findById(req.params.id)
        .then(service => res.json(service))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Remove service by ID 
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Service deleted.'))
       
})

router.route("/update/:id").post((req, res) => {
  Service.findById(req.params.id)
    .then((service) => {
      service.username = req.body.username;
      service.location = req.body.location;
      service.service_type = req.body.service_type;
      service.pay_rate = req.body.pay_rate;

      service
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
})

module.exports = router;

