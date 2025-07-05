import Listing from "../models/listing.model.js"

export const createListing=async(req,res,next)=>{
try {
    const createlist = await Listing.create(req.body)
    return res.status(201).json(createlist)
} catch (error) {
    next(error)
}
}

export const fetchingListing = async (req,res,next)=>{
    try {
         const userLists = await Listing.find({userRef : req.params.id})
         return res.status(200).json(userLists)
    } catch (error) {
        next(error)
    }
} 

export const deleteListing =async (req,res,next)=>{
   try {
    const findList =await Listing.findById(req.params.id)
    if(!findList){
       return next(error(404),"No List FOund")
    }
    // if(req.params.id != findList._id){
    //     return next(error(401,'You Could Only Delete your own List'))
    // }
     
         await Listing.findByIdAndDelete(req.params.id)
         return res.status(200).json("Deleted Successfully")
    
   } catch (error) {
    next(error)
   }
}

export const updateListing =async(req,res,next)=>{
     try {
const findList =await Listing.findById(req.params.id)
    if(!findList){
       return next(error(404),"No List FOund")
    }
   
        const updatedList =await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(updatedList)
    } catch (error) {
        next(error)
    }
}