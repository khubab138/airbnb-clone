//external module
const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/home", storeController.getHome);
storeRouter.get("/booking", storeController.getBookings);
storeRouter.get("/favourite", storeController.getFavourite);

storeRouter.get("/home/:homeId", storeController.getHomeDetails);
storeRouter.post("/favourite", storeController.postAddToFavourite);
storeRouter.post(
  "/favourite/delete/:homeId",
  storeController.postRemoveFromFavourite
);

module.exports = storeRouter;
