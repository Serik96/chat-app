const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(request, responce) {
  try {
    const { name, email, password, profile_pic } = request.body;

    const checkEmail = await UserModel.findOne({ email }); // {email} // null

    if (checkEmail) {
      return responce.status(400).json({
        message: "Already user exists",
        error: true,
      });
    }

    //hashpassword

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    return responce.status(201).json({
      message: "User created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return responce
      .status(500)
      .json({ message: error.message || error, error: true });
  }
}

module.exports = registerUser;
