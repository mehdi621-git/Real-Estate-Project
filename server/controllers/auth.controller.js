import user from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { error } from "../utils/error.js";
import jwt from 'jsonwebtoken'


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

export const Signin =async (req,res,next)=>{
    const {email,password} = req.body
    console.log(process.env.jwtTOKEN)
            try {
                const isEmail = await user.findOne({email})
                console.log(isEmail)
                if(!isEmail) return next(error(404,'Ivalid Email'))
                    const isPassword =bcryptjs.compareSync(password,isEmail.password)
                if(!isPassword) return next(error(401,'Invalid Password'))
                    const {password:pass , ...rest}=isEmail._doc
                        const token = jwt.sign({'id' : isEmail._id} , process.env.jwtTOKEN)
                           return res.cookie('token' , token , {httpOnly : true , expires : new Date(Date.now()+24*60*60)}).status(200).json({'message' : 'Login SuccessFul' , 'user' : rest})

            } catch (error) {
                next(error)
            }
}
export const googleAuth =async (req,res,next)=>{
    const {email,username,photo} =req.body;
    try {
        const searchuser = await user.findOne({email});
  
        if(searchuser){
                   const {password:pass , ...rest}=searchuser._doc
            const token = jwt.sign({'id':searchuser._id} , process.env.jwtTOKEN);
            return res.cookie('token',token,{httpOnly:true,expires:new Date(Date.now()+24*60*60)}).status(200).json({"user":rest})
        }else{
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashPassword =bcryptjs.hashSync(randomPassword,10);
        const newuser = new user({email,username:username+Math.random().toString(36).slice(-5),password : hashPassword,photo});
        await newuser.save()
      const {password:pass , ...rest}=searchuser._doc
       const token = jwt.sign({'id':searchuser._id} , process.env.jwtTOKEN);
            return res.cookie('token',token,{httpOnly:true,expires:new Date(Date.now()+24*60*60)}).status(200).json({"user":rest})
        }
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id); 

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: `User with email ${deletedUser.email} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
export const SignOut =(req,res,next)=>{
    try {
         res.clearCookie('token');
         res.status(200).json({success:true , message: "User has been Log Out"})
    } catch (error) {
        next(error)
    }
}