const exp=require("express");
const teacherApiRoute=exp.Router();
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

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
        res.send({message:"Invalid email"})
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
teacherApiRoute.get("/add",verifyToken,(req,res)=>{
    res.send({message:"add is private"})
})

//export
module.exports=teacherApiRoute;