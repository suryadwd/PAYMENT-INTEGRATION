import { Product } from "../models/product.model.js";

export const createProduct = async (req: any, res: any) => {
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

export const getProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, price, description, image } = req.body;

    if(!id) return res.status(400).json({ message: "Product ID is required" });

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      price,
      description,
      image
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if(!id) return res.status(400).json({ message: "Product ID is required" });

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}