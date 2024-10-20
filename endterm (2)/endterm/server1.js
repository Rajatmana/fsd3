const express=require("express");
// const multer=require("multer");c
const session=require("express-session");
const cookie=require("cookie-parser");
const app=express();
let dbInstance;
const mongodb=require('mongodb');
const client=mongodb.MongoClient;
const ObjectId=mongodb.ObjectId;
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookie());
app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:"1222@@",
    cookie:{
        maxAge:60000
    }
}))

client.connect("mongodb+srv://2211981403:2211981403@cluster0.xx2nsc4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(database=>{
    dbInstance=database.db('user');
    console.log("connecteed");
})

app.get('/index',(req,res)=>{
    dbInstance.collection('user').find().toArray().then(data=>{
        res.render("index",{user:data});
    })
})

app.get('/',(req,res)=>{
    res.render('login');
})
app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.post('/signup',(req,res)=>{
    dbInstance.collection('user').find(req.body).toArray().then(data=>{
        if(data.length>0){
            req.session.username=data[0];
            res.redirect('index');
        }
        else{
            dbInstance.collection('user').insertOne(req.body);
            res.send("added");
        }
    }) 
})
app.get('/delete-user/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id);
    dbInstance.collection('user').deleteOne({_id: new ObjectId(id)}).then(()=>{
        res.redirect('/index');
    })
})
// app.get('/delete-user/:id',(req,res)=>{
//     const id=req.params.id;
//     console.log(id);
//     dbInstance.collection('user').deleteOne(({_id: new ObjectId(id)})).then(()=>{
//         res.redirect('/index');
//     })
// })
app.post('/login',(req,res)=>{
    dbInstance.collection('user').find(req.body).toArray().then(data=>{
        if(data.length>0){
            req.session.username=data[0];
            res.redirect('/index');
        }
        else{
            res.redirect('/signup');
        }
    })
})
app.listen(3003,(err)=>{    
    if(err){
        console.log(err);
    }
    else{
        console.log("server is started");
    }
})


// const express =require("express");
// const session = require("express-session");
// const mongodb=require("mongodb");
// const client=mongodb.MongoClient;
// const session=require("express-session");
// const cookie=require("cookie-parser");
// const app=express();

// app.set("view engine","ejs");

// app.use(express.urlencoded({extended:false}));
// app.use(express.static(__dirname)) ;

































































































































































































































































































































































































































































































































































