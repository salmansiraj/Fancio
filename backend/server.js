const express = require('express');
const cors = require('cors')

// Using mongoose to help connect to MongoDB
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Input mongoClusterURL from ATLAS to connect 
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

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

// Run server 
app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`)
})