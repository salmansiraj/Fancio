const express = require('express');
const cors = require('cors')
const path = require('path')

// Using mongoose to help connect to MongoDB
const mongoose = require('mongoose')

require('dotenv').config({ path: '.env'})

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Input mongoClusterURL from ATLAS to connect 
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});


// Connecting DB to backend server 
const connection = mongoose.connection
connection.once('open', () => { 
    console.log("MongoDB connection established successfully!")
})


// Adding in routes 
const usersRouter = require("./routes/users");
const servicesRouter = require("./routes/services");
const appointmentsRouter = require("./routes/appointments");

app.use("/users", usersRouter);
app.use("/services", servicesRouter);
app.use("/appointments", appointmentsRouter);

const router = require("express").Router()

router.route('/').get((req, res) => {
    res.json("hello")
})

if (process.env.NODE_ENV === 'production') { 
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.use((req, res) => { 
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    })
}


// Run server 
app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`)
})