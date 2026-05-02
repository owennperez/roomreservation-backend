const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    room: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    reservationType: { type: String, required: true },
    professor: { type: String },
    section: { type: String },
    organizationName: { type: String },
    activityDescription: { type: String }
}, { 
    timestamps: true // Para malaman kung kailan sila nag-reserve
});

module.exports = mongoose.model("Form", formSchema);
