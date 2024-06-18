const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(request, response) {
  try {
    const token = request.cookies.token || "";
    const user = await getUserDetailsFromToken(token);

    if (!user || user.logout) {
      return response.status(401).json({
        message: "Unauthorized access or session expired",
        error: true,
      });
    }

    const { name, profile_pic } = request.body;

    if (!name && !profile_pic) {
      return response.status(400).json({
        message: "No data provided for update",
        error: true,
      });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (profile_pic) updateFields.profile_pic = profile_pic;

    const updateUser = await UserModel.updateOne(
      { _id: user._id },
      updateFields
    );

    if (updateUser.nModified === 0) {
      return response.status(400).json({
        message: "No changes were made",
        error: true,
      });
    }

    const userInformation = await UserModel.findById(user._id).select(
      "-password"
    );

    return response.status(200).json({
      message: "User updated successfully",
      data: userInformation,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = updateUserDetails;
