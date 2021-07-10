const exp=require("express");
const app=exp();
const mc = require("mongodb").MongoClient;
const dotenv = require("dotenv");
const path=require("path");

app.use(exp.static(path.join(__dirname,"dist/ANGULAR-LOGIN")))

dotenv.config();

const dburl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rv0eh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

let dbObj;
let teacherObj;
let studentObj;
mc.connect(dburl,{useNewUrlParser: true, useUnifiedTopology: true})
.then(client=>{
    dbObj=client.db(`${process.env.DB_NAME}`)
    teacherObj=dbObj.collection(`${process.env.COLL1}`)
    studentObj=dbObj.collection(`${process.env.COLL2}`)
    console.log("Connected to db successfully");
    app.set("teacherObj",teacherObj);
    app.set("studentObj",studentObj);
})
.catch(err=>{
    console.log("err in db connection",err)
})

const teacherRoute=require("./apis/teacherApi")
app.use("/teacher",teacherRoute)

app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is not found`})
})

app.use((err,req,res,next)=>{
    res.send({message:"Error occured ",reason:err.message})
})


app.listen(process.env.PORT, () => {
  console.log("Listening on port no ", process.env.PORT);
});