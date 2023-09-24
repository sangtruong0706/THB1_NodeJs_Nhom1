import express from "express";
import homeController from "../controllers/HomeController";
import aboutController from "../controllers/AboutController";
import userController from "../controllers/UserController";
const router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeController.homePage);
  router.get("/about", aboutController.aboutPage)
  router.get("/create-new-user", userController.newUser)
  router.get("/list-user", userController.getAllUser)
  router.get("/login", userController.login)
  router.get("/detail-user/:id_user", userController.DetailUser)
  // router.get("/detail-user/:userName", (req, res) => {
  //     res.send(req.userName)
  //   return res.render("detailUser");
  // });
  router.get("*", (req, res) => {
    return res.render("404");
  });
  return app.use("/", router);
};
module.exports = initWebRoute;
