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
export const getAList =async (req,res,next)=>{
 try {
         const userLists = await Listing.find({_id : req.params.id})
         return res.status(200).json(userLists)
    } catch (error) {
        next(error)
    }
}

export const SearchListing = async (req,res,next)=>{
    console.log("Query is: " + JSON.stringify(req.query));

    try {
        const limit =parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        if(offer == undefined ){
            offer ={$in : [false,true]};
        }
        let furnished =req.query.furnished;
        if(furnished == undefined){
            furnished = {$in : [false,true]}
        }
        let parking =req.query.parking
        if(parking == undefined ){
            parking = {$in : [true,false]}
        }
        let type =req.query.type
        if(type == undefined || type == 'all'){
            type = {$in :['sell','rent']}
        }
        const searchTerm = req.query.searchterm?.trim() || ''
        const sort =req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        console.log(searchTerm)
// const searchedListings = await Listing.find({ name: { $regex: '^Modern Villa$', $options: 'i' } }).limit(1)

const regex = new RegExp(searchTerm, 'i');
        const searchedListings = await Listing.find({
                     name : {$regex : regex },
                     offer,
                     furnished,
                     parking,
                     type,
        })
          .sort({[sort] : order})
          .limit(limit)
          .skip(startIndex)
          console.log(searchedListings)
          res.status(200).json(searchedListings)
    } catch (error) {
        next(error)
    }
}
