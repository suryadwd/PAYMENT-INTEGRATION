import { Product } from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    if(!name || !price || !description || !image) return res.status(400).json({ message: "All fields are required" });

    const newProduct = new Product({
      name,
      price,
      description,
      image
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}