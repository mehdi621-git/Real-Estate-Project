import bcryptjs from 'bcryptjs'; // Only if you're hashing passwords
import user from '../models/user.model.js';

export const profileUpdate = async (req, res, next) => {
  const { username, password } = req.body;
  const id = req.params.id;
  console.log(id)

  const tobeUpdated = {};

  if (username) tobeUpdated.username = username;

  if (password) {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    tobeUpdated.password = hashedPassword;
  }

  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { $set: tobeUpdated },
      { new: true }
    );
const {password:pass , ...rest}=updatedUser._doc
    res.status(200).json({
      message: 'User updated successfully',
      success : 'true',
      statuscode:200,
      rest,
    });
  } catch (error) {
    next(error);
  }
};
