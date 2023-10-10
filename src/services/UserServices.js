import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await bcrypt.hash(data.password, salt);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        username: data.username,
        fullname: data.fullname,
        address: data.address,
        gender: data.gender,
        groupId: data.groupId,
      });
      resolve("create success");
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserInfoById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userId = await db.User.findOne({
        raw: true,
        where: { id: id },
      });
      if (userId) {
        resolve(userId);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        (user.username = data.username), (user.fullname = data.fullname);
        user.gender = data.gender;
        (user.email = data.email), (user.address = data.address);
        user.groupId = data.groupId;
        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({
        where: {
          id: id,
        },
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let registerUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await bcrypt.hash(data.password, salt);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        username: data.username,
        fullname: data.fullname,
        address: data.address,
        gender: data.gender,
        groupId: 0,
      });
      resolve("create success");
    } catch (error) {
      reject(error);
    }
  });
};
const loginUser = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exists
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
        });
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password); // false
          if (check) {
            userData.errCode = 0;
            userData.errMessage = `ok`;
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `You'r Email isn't exits in your system. Plz try again`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findOne({
        where: { email: email},
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserByID = (id_user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findOne({
        where: { id: id_user},
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUser: deleteUser,
  checkUserEmail: checkUserEmail,
  registerUser: registerUser,
  loginUser: loginUser,
  getUserByEmail: getUserByEmail,
  getUserByID: getUserByID
};
