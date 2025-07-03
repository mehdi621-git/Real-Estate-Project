import express from 'express'
import { createListing } from '../controllers/listing.controller.js';
import { validateUser } from '../utils/validateUser.js';

const route= express.Router();


route.post('/create',validateUser,createListing)
export default route