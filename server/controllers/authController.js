const User=require("../models/User");
const jwt=require("jsonwebtoken");
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"});
}
const registerAdmin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"Admin with this email already exists"});
        }
        const user=await User.create({email,password});
        res.status(201).json({
            _id:user._id,
            email:user.email,
            token:generateToken(user._id)
        });
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const loginAdmin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user||!(await user.matchPassword(password))){
            return res.status(401).json({message:"Invalid email or password"});
        }
        res.json({
            _id:user._id,
            email:user.email,
            token:generateToken(user._id),
        });
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports={registerAdmin,loginAdmin};