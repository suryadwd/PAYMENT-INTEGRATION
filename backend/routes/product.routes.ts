import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";
import { protectRoute } from "../utils/middleware.js";

const router = Router();

router.post("/create", protectRoute, createProduct);
router.get("/",  getProducts);
router.post("/update/:id", protectRoute, updateProduct);
router.delete("/delete/:id", protectRoute, deleteProduct);

export default router;
