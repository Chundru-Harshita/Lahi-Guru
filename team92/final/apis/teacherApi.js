const exp=require("express");
const teacherApiRoute=exp.Router();
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const accountSid = 'AC5b3533808c0c2139a340715db6c926b2'; 
const authToken = '191b8a02ce0926c1cf102d1363c8d2de'; 
const client = require('twilio')(accountSid, authToken); 

//use json middleware
teacherApiRoute.use(exp.json());

//middleware to verify token of req obj
const verifyToken=(req,res,next)=>{
    let tokenWithBearer=req.headers["authorization"]
    if(tokenWithBearer==undefined){
        return res.send({message:"Unauthorised access"})
    }
    else{
        if(tokenWithBearer.startsWith('Bearer ')){
            let token=tokenWithBearer.slice(7,tokenWithBearer.length)
            jwt.verify(token,"abcd",(err,decodedToken)=>{
                if(err){
                    return res.send({message:"Session expired. Login again"})
                }
                else{
                    next();
                }
            })
        }
    }
}

//request for user registeration
teacherApiRoute.post("/register", async (req,res)=>{
    const teacherCollectionObj=req.app.get("teacherObj");
    let teacherObj=req.body;

    let teacherObjOfDb=await teacherCollectionObj.findOne({username: teacherObj.username})

    if(teacherObjOfDb!=null){
        res.send({message:"failed"})
    }
    else{
        let hashedPw=await bcrypt.hash(teacherObj.password,6);
        teacherObj.password=hashedPw;

        let result= await teacherCollectionObj.insertOne(teacherObj);
        
        res.send({message:"success"})
         
    }
})

//user login route
teacherApiRoute.post("/login",async (req,res)=>{
    let teacherCredentialsObj=req.body;
    
    const teacherCollectionObj=req.app.get("teacherObj")
    let teacherObjFromDb= await teacherCollectionObj.findOne({username: teacherCredentialsObj.username})
    if(teacherObjFromDb==null){
        res.send({message:"Invalid username"})
    }
    else{
        //compare passwords
        let result=await bcrypt.compare(teacherCredentialsObj.password,teacherObjFromDb.password)
        //password not matched
        if(result==false){
            res.send({message:"Invalid password"})
        }
        //password matched
        else{
            let signedToken= await jwt.sign({username :teacherCredentialsObj.username},"abcd",{expiresIn: "2h"})
            
            res.send({message:"login success",jwt:signedToken,userObj:teacherObjFromDb})
        }
    }
})

//private route
//teacherApiRoute.post("/add",verifyToken,async (req,res)=>{
teacherApiRoute.post("/add",verifyToken,async (req,res)=>{
    let studentCredentialsObj=req.body;
    const studentCollectionObj=req.app.get("studentObj")
    let studentObjOfDb=await studentCollectionObj.findOne({mobileno: studentCredentialsObj.mobileno})

    if(studentObjOfDb!=null){
        res.send({message:"failed"})
    }
    else{
        let result= await studentCollectionObj.insertOne(studentCredentialsObj);
        
        res.send({message:"success"})
    }
})

teacherApiRoute.post("/send",verifyToken,async (req,res)=>{
    let studentObj=req.body;
    const studentCollectionObj=req.app.get("studentObj")
    let studentObjOfDb=await studentCollectionObj.find({classname: studentObj.classname}).forEach(element => {
        setTimeout(()=>{
            client.messages 
                .create({ 
                    body: `${studentObj.meetingLink}`, 
                    from: 'whatsapp:+14155238886',       
                    to: `whatsapp:+91${element.mobileno}`
                 }) 
                .then() 
                .done();
            client.messages 
                .create({ 
                   body: `${studentObj.meetingLink}`, 
                   from: '+16123548914',       
                   to: `+91${element.mobileno}`
                 }) 
                .then() 
                .done();
          },Date.parse(studentObj.timings)-(new Date().getTime())-900000)
    });
    res.send({message:"success"});
})

//export
module.exports=teacherApiRoute;