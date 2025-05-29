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

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Deletes a product by its ID.
 *
 * This function handles the deletion of a product from the database 
 * using the product ID provided in the request parameters. 
 * It returns a 400 status if the product ID is not provided, 
 * a 404 status if the product is not found, and a 200 status 
 * with a success message if the product is deleted successfully.
 *
 * @param req - The request object containing the product ID in the parameters.
 * @param res - The response object used to send back the appropriate HTTP response.
 */

/*******  05346216-cee4-4d82-8903-af3c0be5338e  *******/
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