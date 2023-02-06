require('dotenv').config();
require("./database/database").connect();
const User = require('./model/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("<h1>SERVER is working.........</h1>")
})

app.post("/register", async (req, res) => {
    try {
        
        // 1. Get all data body
        const { firstname, lastname, email, password } = req.body 
        
        // 2. All the data should exists
        if (!(firstname && lastname && email && password)){
            res.status(400).send('All fields are compulsory')
        }

        // 3. Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(401).send('User already exists with this email.')
        }

        // 4. Encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10)
        
        // 5. Save the user in DB
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: encryptedPassword
        })

        // 6. Generate a token for user and send it
        const token = jwt.sign({id: _id, email},
            'shhhh', // process.env.jwtsecret
            {
                expiresIn: "2h"
            }
        );
        user.token = token 
        user.password = undefined

        res.status(201).send(user)
        
    } catch (error) {
        console.log(error);
        
    }
})

app.post('/login', async (req, res) => {
    try {
        // 1. Get all data from frontend
        const { email, password} = req.body

        // 2. Validation
        if (!(email && password)) {
            res.status(400).send('send all data')
        }
        // 3. Find user in DB
        const user = await User.findOne({email})

        // If user is not there, then what?

        // 4. Math the password
        if (user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({id: _id, email},
                'shhhh', // process.env.jwtsecret
                {
                    expiresIn: "2h"
                }
            );

            user.token = token 
            user.password = undefined

           // cookie section
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            }) 
        
          // 5. Send a token
        }

    } catch (error) {
        
    }
})


module.exports = app;