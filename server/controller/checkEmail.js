const UserModel = require("../models/UserModel");

async function checkEmail(request, responce) {
  try {
    const { email } = request.body;

    const checkEmail = await UserModel.findOne({ email }).select("-password");

    if (!checkEmail) {
      return responce.status(400).json({
        message: "user not exist",
        error: true,
      });
    }

    return responce.status(200).json({
      message: "email verified",
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    return responce
      .status(500)
      .json({ message: error.message || error, error: true });
  }
}

module.exports = checkEmail;
