import express from "express";
import { create, test, verifyPayment } from "../controllers/user.controller.js";

const Router = express.Router();

// define all routes
// Router.post("/", test);
Router.post("/", create);
Router.post('/verify-payment', verifyPayment);

export default Router;