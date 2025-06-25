import express from 'express'

import connection from './database/connection.js';

const app =express();
    

connection();


const port=3000;
app.listen(port , ()=>{
    console.log(`Server is listening on port ${port}`)
})