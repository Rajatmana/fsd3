// npm i mongoose
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Task = require('./taskSchema');

mongoose.connect('mongodb+srv://2211981403:2211981403@cluster0.xx2nsc4.mongodb.net/dabase_name?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Mongoose Connected');
}).catch((err)=>{
    console.log(err);
})


app.post('/add-task',(req,res)=>{
    // let task = req.body.task;
    const {task} = req.body;
    let tasks = new Task({task});
    tasks.save();
})

app.post('/find-task',(req,res)=>{
    Task.find().then((data))
})

app.post('/delete/:id',(req,res)=>{
    Task.findByIdAndDelete(id)
})