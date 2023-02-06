require('dotenv').config()
require("./database/database").connect()
const express = require('express')

const app = express()

app.get("/", (req, res) => {
    res.send("<h1>SERVER is working.........</h1>")
})
module.exports = app