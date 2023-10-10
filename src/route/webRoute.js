import express from "express";
import homeController from "../controllers/HomeController";
import aboutController from "../controllers/AboutController";
import userController from "../controllers/UserController";

const router = express.Router();
const initWebRoute = (app) => {
  router.get("/", userController.isLogin, homeController.homePage);
  router.get("/list-user", userController.isLogin, userController.getAllUser);
  router.get(
    "/create-new-user",
    userController.isLogin,
    userController.createNewUser
  );
  router.post(
    "/insert-user",
    userController.isLogin,
    userController.insertUser
  );
  router.get("/edit-user/:id", userController.isLogin, userController.editUser);
  router.post(
    "/update-user",
    userController.isLogin,
    userController.updateUser
  );
  router.get(
    "/delete-user/:id",
    userController.isLogin,
    userController.deleteUser
  );
  router.get(
    "/detail-user/:id",
    userController.isLogin,
    userController.detailUser
  );
  router.get("/about",userController.isLogin, aboutController.aboutPage)
  router.get("/login", userController.loginPage);
  router.get("/register", userController.registerPage);

  router.post("/register-user", userController.register);
  router.post("/login-user", userController.loginUser);
  router.get("/logout", userController.logout);
  router.get("*", (req, res) => {
    return res.render("404");
  });
  return app.use("/", router);
};
module.exports = initWebRoute;
