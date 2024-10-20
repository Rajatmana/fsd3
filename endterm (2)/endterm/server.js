const express=require("express");
const session = require("express-session");
const cookie=require("cookie-parser");
let dbInstance;
const mongodb=require("mongodb");
// const { render } = require("ejs");
const client=mongodb.MongoClient;
const app=express();
const ObjectId=mongodb.ObjectId;

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));     
app.use(express.static(__dirname));
app.use(express.json());
app.use(cookie());
app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:"abdbsb%",
    cookie:{
        maxAge:60000
    }
}))


client.connect("mongodb+srv://2211981403:2211981403@cluster0.xx2nsc4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(database=>{
    dbInstance=database.db('user');
    console.log("database connected");
})

app.get('/',(req,res)=>{
    res.render('login');
})
app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.get('/index',(req,res)=>{
    dbInstance.collection('user').find().then(data=>{
        res.render('index',{user:data});
    })

})
app.post('/signup',(req,res)=>{
    dbInstance.collection('user').find(req.body).toArray().then(data=>{
        if(data.length>0){
            req.session.username=data[0];
        }
        else{
            dbInstance.collection('user').insertOne(req.body).then(()=>{
                res.send("addeed");
            })
        }
    })
})
app.get("/delete-user/:id",(req,res)=>{
    let id=req.params.id;
    dbInstance.collection('user').deleteOne(({_id: new ObjectId(id)})).then(()=>{
        res.redirect('/index');
    })
})
app.post('/login',(req,res)=>{
    dbInstance.collection('user').find(req.body).toArray().then(data=>{
        if(data.length>0){
            req.session.username=data[0];
            res.redirect("index");
        }
        else{
            res.redirect('/signup');
            
        }
    })
})
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server started");
})
