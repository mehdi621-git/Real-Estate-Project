
import express from 'express'
import { getUser } from '../controllers/user.controller.js';
const route =express.Router();

route.get('/getuser/:id',getUser)
route.get('/get',(req,res)=> {return res.json("hello")})

export default route
