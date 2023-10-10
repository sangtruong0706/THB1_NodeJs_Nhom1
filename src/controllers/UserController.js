import asyncHandler from "express-async-handler";
import userService from "../services/UserServices";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
import { promisify } from "util";
const salt = bcrypt.genSaltSync(10);

const getAllUser = async (req, res) => {
  if (req.user) {
    let userList = await userService.getAllUsers();
    return res.render("main", {
      data: {
        title: "List User",
        page: "listUser",
        rows: userList,
        user: req.user,
      },
    });
  } else {
    return res.redirect("/login");
  }
};
const detailUser = async (req, res) => {
  if (req.user) {
    let id = req.params.id;
    let detailUser = await userService.getUserInfoById(id);
    return res.render("main", {
      data: {
        title: "Detail User",
        page: "detailUser",
        rows: detailUser,
        user: req.user,
      },
    });
  } else {
    return res.redirect("/login");
  }
};
const createNewUser = (req, res) => {
  if (req.user) {
    return res.render("main", {
      data: { title: "Create New User", page: "newUser", user: req.user },
    });
  } else {
    return res.redirect("/login");
  }
};
const insertUser = async (req, res) => {
  if (req.user) {
    let message = await userService.createNewUser(req.body);
    // console.log(message);
    return res.redirect("/list-user");
  } else {
    return res.redirect("/login");
  }
};
const editUser = async (req, res) => {
  if (req.user) {
    let id = req.params.id;
    let dataUser = await userService.getUserInfoById(id);
    return res.render("main", {
      data: {
        title: "Edit User",
        page: "editUser",
        rows: dataUser,
        user: req.user,
      },
    });
  } else {
    return res.redirect("/login");
  }
};
const updateUser = async (req, res) => {
  if (req.user) {
    let data = req.body;
    // console.log(data.id);
    await userService.updateUserData(data);
    return res.redirect("/list-user");
  } else {
    return res.redirect("/login");
  }
};
const deleteUser = async (req, res) => {
  if (req.user) {
    let id = req.params.id;
    await userService.deleteUser(id);
    return res.redirect("/list-user");
  } else {
    return res.redirect("/login");
  }
};
const registerPage = (req, res) => {
  return res.render("register", { msg: "", msgType: "empty" });
};
const register = async (req, res) => {
  // console.log(req.body);
  let emailUser = req.body.email;
  let checkMailExists = await userService.checkUserEmail(emailUser);
  if (checkMailExists == true) {
    return res.render("register", {
      msg: "Email already exists",
      msgType: "error",
    });
  } else {
    let message = await userService.registerUser(req.body);
    // console.log(message);
    if (message) {
      return res.render("register", {
        msg: "Register successfully",
        msgType: "good",
      });
    } else {
      return res.render("register", {
        msg: "Register error",
        msgType: "error",
      });
    }
  }
};
const loginPage = (req, res) => {
  return res.render("login", { msg: "", msgType: "empty" });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", {
        msg: "Please enter your email or password.",
        msgType: "error",
      });
    }
    const result = await userService.loginUser(email, password);
    if (result == false) {
      // console.log("login failed");
      return res.status(400).render("login", {
        msg: "Email or password incorrect",
        msgType: "error",
      });
    } else {
      // console.log("login successful");
      const user = await userService.getUserByEmail(email);
      const id = user.id;
      const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      // console.log("token is " + token);
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
      const name = user.username;
      res.cookie("sang", token, cookieOptions);

      res.status(200).redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};
const isLogin = async (req, res, next) => {
  // req.name = "Check Login";
  // console.log(req.cookies);
  if (req.cookies.sang) {
    try {
      const decode = await promisify(jwt.verify)(
        req.cookies.sang,
        process.env.JWT_SECRET
      );
      // console.log(decode);
      const getUserById = await userService.getUserByID(decode.id);
      // console.log(getUserById);
      if (!getUserById) {
        return next();
      }
      req.user = getUserById;
      return next();
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
};
const logout = async (req, res) => {
  res.cookie("sang", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect("/login");
};

module.exports = {
  getAllUser,
  createNewUser,
  insertUser,
  editUser,
  updateUser,
  deleteUser,
  detailUser,
  registerPage,
  register,
  loginPage,
  loginUser,
  isLogin,
  logout,
};
