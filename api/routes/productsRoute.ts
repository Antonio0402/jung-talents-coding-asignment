import express from "express";
import { getAllProducts, getProductBySlug } from "../controllers/products/productsController.js";
const productsRoute = express.Router();

productsRoute.get("/", getAllProducts)
  .get("/:slug", getProductBySlug)

export default productsRoute;