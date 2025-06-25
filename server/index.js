import express from 'express'

import connection from './database/connection.js';
import  userRouter from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

connection();
const app =express();
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const port=3000;
app.listen(port , ()=>{
    console.log(`Server is listening on port ${port}`)
})

app.use('/server/user',userRouter)
app.use('/server/auth',authRoute)

app.use((err,req,res,next)=>{
    const statuscode = err.statusCode || err.code  || 500;
    const message = err.message || " Internal Server Error"

    return res.json({
        success:false,
        message,
        statuscode
    })
})