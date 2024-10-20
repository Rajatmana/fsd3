const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

// const upload = multer({ dest: "upload/"});

const Storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,__dirname+"/public/user");
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+".jpeg");
  }
})

const filter=(req,file,cb)=>{
  if(file.mimetype.split("/")[1]=="png"||file.mimetype.split("/")[1]=="jpeg"||file.mimetype.split("/")[1]=="jpg"){
    cb(null,true);
  }else{
    cb(new Error("file type not supported"),false)
  }
}

const upload = multer({storage:Storage,limits:{fileSize:1024*1024}})

app.use(express.urlencoded({extended:true}));

app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

app.get("/",(req,res)=>{
  return res.render("index.ejs");
})

app.post("/submit",upload.single("profileImage"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})

app.listen(3000,()=>{
    console.log(`server is running `);
})