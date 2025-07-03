import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { error } from '../utils/error.js';
import user from '../models/user.model.js';

export const imgUploadToCloudinary = async (req, res, next) => {
    console.log('BODY:', req.body);
console.log('FILE:', req.file);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Uploading...');
 const userId = req.params.id  ;
console.log(userId) 
  try {
    if (!req.file || !req.file.buffer) {
     next(error(400,"No image file uploaded"))
    }

      const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'myUploads' }, // Optional folder
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();
     
    if (!userId) {
        console.log(userId) 
      return next(error(400, 'User ID is required to update image'));
    }
     const updatedUser = await user.findByIdAndUpdate(
      userId,
      {
        $set: {
          photo: result.secure_url,
          ...req.body, // Optional: update other user fields if needed
        },
      },
      { new: true }
    );
  const {password:pass , ...rest}=updatedUser._doc
    res.status(200).json({
      message: 'Upload successful and user updated',
      imageUrl: result.secure_url,
      user: rest,
    });
  } catch (err) {
    next(err);
  }
};
