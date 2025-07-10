
import express from 'express'
import { getUser } from '../controllers/user.controller.js';
const route =express.Router();

route.get('/getuser/:id',getUser)


export default route