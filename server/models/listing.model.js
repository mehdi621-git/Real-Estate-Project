import mongoose from "mongoose";


const listingSchema = new mongoose.Schema({
     name:{
        type:String,
        required :true
     },
        description:{
        type:String,
        required :true
     },   
     address:{
        type:String,
        required :true
     },   
     regularprice:{
        type:Number,
        required :true
     },  
      offerprice:{
        type:Number,
        
     },   
     bathrooms:{
        type:Number,
        required :true
     },   
     bedrooms:{
        type:Number,
        required :true
     },   
     furnished:{
        type:Boolean,
        required :true
     },
       parking:{
        type:Boolean,
        required :true
     },
        type:{
        type:String,
        required :true
     },
       offer:{
        type:String,
       
     },
        imageUrls:{
        type:Array,
        required :true
     },
       userRef:{
        type:String,
        required :true
     },
     
},{timestamps:true})

const Listing = new mongoose.model('listing',listingSchema)
export default Listing