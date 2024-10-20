const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('task', Schema);


const mongoose=require("mongoose");
const schrma=new mongoose.Schema({
    type:{

    }
})

module.exports= mongoose.model('task',Schema);