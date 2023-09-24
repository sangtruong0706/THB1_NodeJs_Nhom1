import asyncHandler from "express-async-handler";
import userModel from "../models/userModel";

const getAllUser = async (req, res) => {
  let userList = await userModel.getAllUser();
  res.render('main', {data: {title: "List All Users", page: "listUser", rows: userList}})
};
const DetailUser = async (req, res) => {
  let user_id = req.params.id_user;
  let userDetail = await userModel.DetailUser(user_id);
  res.render('main', {data: {title: "Detail Users", page: "detailUser", rows: userDetail}})
};

const newUser = asyncHandler(async (req, res) => {
  return res.render("main", {
    data: { title: "Tạo tài khoản", page: "newUser" },
  });
});
// const listUser = asyncHandler(async (req, res) => {
//   return res.render("main", {
//     data: { title: "Danh sách tài khoản", page: "listUser" },
//   });
// });
const login = asyncHandler(async (req, res) => {
  return res.render("main", { data: { title: "Đăng nhập", page: "login" } });
});
// const detailUser = asyncHandler(async (req, res) => {
//   return res.render("main", {
//     data: { title: "Detail User", page: "detailUser" },
//     userName: "user",
//   });
// });

module.exports = {
  newUser,
  login,
  DetailUser,
  getAllUser
};
