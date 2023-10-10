import express from "express";
import apiController from "../controllers/apiController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/get-list-user", apiController.getListUser);
  router.get("/get-detail-user/:id", apiController.getDetailUser);
  router.post("/create-new-user", apiController.getCreateNewUser);
  router.post("/update-user", apiController.getUpdateUser);
  router.get("/delete-user/:id", apiController.getDeleteUser);

  return app.use("/api/v1", router);
};

export default initApiRoutes;
