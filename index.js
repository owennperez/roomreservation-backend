const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express(); 
const server = http.createServer(app); 

// 1. MIDDLEWARE & CORS
app.use(cors()); 

app.options("{*path}", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});

app.use(express.json());

// 2. DATABASE CONNECTION (Updated URI)
const dbURI = "mongodb://owennperez:owennperez@ac-fqmpjax-shard-00-00.ftgvrk6.mongodb.net:27017,ac-fqmpjax-shard-00-01.ftgvrk6.mongodb.net:27017,ac-fqmpjax-shard-00-02.ftgvrk6.mongodb.net:27017/RoomReservation?ssl=true&replicaSet=atlas-hla0xk-shard-0&authSource=admin&appName=owennperez";

mongoose 
    .connect(dbURI) 
    .then(() => console.log("✅ MongoDB Connected Successfully: Room Reservation Database"))
    .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); 
    });

// 3. ROUTES
const submitForm = require('./API/submit');
app.use("/submit", submitForm);

app.get('/', (req, res) => {
    res.send("Room Reservation API is online.");
});

// 4. START SERVER
const PORT = process.env.PORT || 8080; 

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
