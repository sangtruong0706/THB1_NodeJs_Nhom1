import asyncHandler from "express-async-handler";
import userService from "../services/UserServices";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
import { promisify } from "util";
const salt = bcrypt.genSaltSync(10);

const getListUser = async (req, res) => {
  const data = {};
  const listUser = await userService.getAllUsers();
  return res.status(200).json({
    errCode: 1,
    message: "Get is succeed!",
    data: listUser,
  });
};
const getDetailUser = async (req, res) => {
  const id_user = req.params.id;
  const detailUser = await userService.getUserInfoById(id_user);
  return res.status(200).json({
    errCode: 1,
    message: "Get is succeed!",
    data: detailUser,
  });
};
const getDeleteUser = async (req, res) => {
  const id_user = req.params.id;
  await userService.deleteUser(id_user);
  return res.status(200).json({
    errCode: 1,
    message: "Delete user succeed!",
  });
};
const getCreateNewUser = async (req, res) => {
  const data = req.body;
  const { usename, password, email, fullname, address, gender } = req.body;
  if (await userService.checkUserEmail(email)) {
    return res.status(200).json({
      errCode: 0,
      message: "User is existed",
    });
  } else {
    await userService.createNewUser(data);
    return res.status(200).json({
      errCode: 1,
      message: "Created user successfully",
    });
  }
};
const getUpdateUser = async (req, res) => {
  const data = req.body;
  await userService.updateUserData(req.body);
  return res.status(200).json({
    errCode: 1,
    message: "Updated user successfully",
  });
};

module.exports = {
  getListUser,
  getDetailUser,
  getCreateNewUser,
  getUpdateUser,
  getDeleteUser,
};
