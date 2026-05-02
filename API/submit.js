const express = require("express");
const router = express.Router();

// 1. Import the model (Siguraduhin na tama ang path)
const Form = require("../Models/form"); 

router.post("/", async (req, res) => {
    try {
        const {
            name, contact, room, date, startTime, endTime,
            reservationType, professor, section, organizationName, activityDescription
        } = req.body;

        // --- 2. BASIC VALIDATION ---
        // Name, Contact, Room, at Date ang ginawa nating mandatory
        if (!name || !contact || !room || !date) {
            return res.status(400).json({ 
                message: "❌ Missing required fields: Name, Contact, Room, and Date are mandatory." 
            });
        }

        console.log("📥 Received Reservation:", { name, room, date, reservationType });

        // --- 3. DATABASE LOGIC ---
        const newEntry = new Form({
            name, contact, room, date, startTime, endTime,
            reservationType, professor, section, organizationName, activityDescription
        });

        await newEntry.save(); 

        // --- 4. SUCCESS RESPONSE ---
        res.status(201).json({ 
            message: "✅ Room Reservation Submitted Successfully!",
            receivedData: name 
        });

    } catch (error) {
        console.error("❌ SUBMISSION ERROR:", error.message);
        
        res.status(500).json({ 
            message: "Internal Server Error. Could not save reservation.",
            error: error.message 
        });
    }
});

module.exports = router;
