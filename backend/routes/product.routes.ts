import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = Router();

router.post("/create", createProduct);
router.get("/", getProducts);
router.post("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
