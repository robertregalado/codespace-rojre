const mongoose = require("mongoose");

const {MONGOBD_URL} = process.env

exports.connect = () => {
    mongoose.connect(MONGOBD_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        console.log(`DB connected successfully`)
    )
    .catch((error) => {
        console.log(`DB connection FAILED`);
        console.log(error);
        process.exit(1);
    });
}