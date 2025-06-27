import express from 'express'
import { Signin, Signup } from '../controllers/auth.controller.js';

const route = express.Router()
route.post('/signup',Signup);
route.post('/signin',Signin)

export default route