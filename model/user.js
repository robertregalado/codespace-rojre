const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    // assignment
    token: {
        type: String,
        default: null
    },

})

module.exports = mongoose.model("user", userSchema)