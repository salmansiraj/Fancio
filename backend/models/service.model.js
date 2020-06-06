const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
    {
        username: { type: String, required: true },
        location: { type: String, required: true },
        service_type: { type: String, required: true },
        pay_rate: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;