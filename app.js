require('dotenv').config();
require("./database/database").connect();
const express = require('express');

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>SERVER is working.........</h1>")
})

app.post("/register", async (req, res) => {
    try {
        // 1. Get all data body
        // 2. All the data should exists
        // 3. Check if user already exists
        // 4. Encrypt the password
        // 5. Save the user in DB
        // 6. Generate a token for user and send it
        
    } catch (error) {
        console.log(error);
        
    }
})

module.exports = app;