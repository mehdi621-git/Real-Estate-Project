import express from 'express'
import { deleteUser, googleAuth, Signin, SignOut, Signup } from '../controllers/auth.controller.js';

const route = express.Router()
route.post('/signup',Signup);
route.post('/signin',Signin);
route.post('/google',googleAuth)
route.delete('/deleteuser/:id',deleteUser)
route.get('/signout',SignOut)

export default route