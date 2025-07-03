import Listing from "../models/listing.model"

export const createListing=async(req,res,next)=>{
try {
    const createlist = await Listing.create(req.body)
    return res.status(201).json(createlist)
} catch (error) {
    next(error)
}
}