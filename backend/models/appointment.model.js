const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
    {
        client_username: { type: String, required: true },
        stylist_username: { type: String, required: true },
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