import express from 'express';
import { imgUploadToCloudinary } from '../controllers/imgupload.controller.js';
import upload from '../cloudinary/multer.js'; // assuming the path is correct

const route = express.Router();

route.post('/imgUpload/:id', upload.single('image'), imgUploadToCloudinary);

export default route;