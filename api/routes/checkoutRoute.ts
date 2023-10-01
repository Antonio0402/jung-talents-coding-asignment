import express from "express";
import { createOrder } from "../controllers/checkout/checkoutController.js";
const checkOutRoute = express.Router();

checkOutRoute.post("/order", createOrder);

export default checkOutRoute;