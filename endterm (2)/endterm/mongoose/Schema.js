const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    // username: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: 'user'
    }
});

module.exports = mongoose.model('user-details', Schema);