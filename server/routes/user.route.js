
import express from 'express'
const router =express.Router();
router.get('/test',(req,res)=>{
    res.send("Connected to server from router")
}) 



export default router