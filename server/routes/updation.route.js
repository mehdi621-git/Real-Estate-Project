
import express from 'express'
import { profileUpdate } from '../controllers/updation.controller.js'
const route = express.Router()

route.post('/profile/:id',profileUpdate)



export default route