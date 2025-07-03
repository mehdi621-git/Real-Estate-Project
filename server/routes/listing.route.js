import express from 'express'
import { createListing } from '../controllers/listing.controller.js';


const route= express.Router();


route.post('/create',createListing)
export default route