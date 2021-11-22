const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {

        type: String,
        required: true,
        unique: true,
        min: 6
    },
    email: {

        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    password: {

        type: String,
        required: true,
        min: 8
    },
    refreshToken: {

        type: String
    }
});

module.exports = mongoose.model('User', userSchema);