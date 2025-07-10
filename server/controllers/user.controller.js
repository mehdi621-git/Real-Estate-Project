import user from "../models/user.model.js"
import { error } from "../utils/error.js"

export const getUser =async (req,res,next)=>{
    try {
         const newUser = await user.findById(req.params.id)
        const {password:pass , ...rest}=newUser._doc 
        console.log(rest)
        if(!newUser){
            next(error(401,"User Not Found"))
        }
        return res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}