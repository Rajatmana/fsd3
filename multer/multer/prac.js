const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,__dirname+"/public/user");
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+".jpeg");
    }
})

const filter = (req,file,cb)=>{
    if(file.mimetype.split("/")[1]==".png" || file.mimetype.split("/")[1]==".jpeg" || file.mimetype.split("/")[1]=="jpg"){
        cb(null,true);
    }
    else {
        cb(new Error("File type is not valid"),false);
    }
}

const upload = multer({storage:Storage , limits:({fileSize: 1024*1024})});

app.set("viewengine" , "ejs");
app.set("views" , path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/submit",upload.single("img"),(req,res)=>{
    
    console.log(req.body);
    console.log(req.file);

    res.redirect("/");
})


app.listen(3000,()=>{
    console.log("server is running");
})