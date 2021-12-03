const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({

    location: {

        type: String
    },
    description: {

        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sport', sportSchema);