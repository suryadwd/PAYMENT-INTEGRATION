import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";
import { protectRoute } from "../utils/middleware.js";

const router = Router();

router.post("/protectRoute/create", createProduct);
router.get("/protectRoute/", getProducts);
router.post("/protectRoute/:id", updateProduct);
router.delete("/protectRoute/:id", deleteProduct);

export default router;
