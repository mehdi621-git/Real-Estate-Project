import express from 'express'
import { googleAuth, Signin, Signup } from '../controllers/auth.controller.js';

const route = express.Router()
route.post('/signup',Signup);
route.post('/signin',Signin);
route.post('/google',googleAuth)

export default route