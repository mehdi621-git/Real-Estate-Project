import user from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
export const Signup=async (req,res,next)=>{
console.log(req.body)

const {email,password,username} =req.body;
const hashPass = bcryptjs.hashSync(password,10) 

const newUser = new user({email,password:hashPass,username})
 await newUser.save()
try {
    return res.status(201).json({'message':'user registered successfully'})
} catch (error) {
    next(error)
} 
}