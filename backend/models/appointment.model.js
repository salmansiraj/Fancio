const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
    {
        worker_username: { type: String, required: true },
        contractor_username: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: Date, required: true },
        accepted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;