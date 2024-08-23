import express from "express";
import { verifyCode, verifyEmail, verifyPhone } from "../controllers/verify.controller.js";

const Router = express.Router();

// define all routes
Router.post("/email", verifyEmail);
Router.post("/code", verifyCode);
Router.post("/phoneNumber", verifyPhone);

export default Router;
