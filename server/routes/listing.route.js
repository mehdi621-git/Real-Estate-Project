import express from 'express'
import { createListing, deleteListing, fetchingListing, getAList, SearchListing, updateListing } from '../controllers/listing.controller.js';


const route= express.Router();


route.post('/create',createListing)
route.get('/fetch/:id',fetchingListing)
route.delete('/delete/:id',deleteListing)
route.put('/update/:id',updateListing)
route.get('/get/:id',getAList)
route.get('/search',SearchListing)

export default route  