import axios from "axios";
import { useState } from "react";

const AddProducts = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
 
   const [data, setData] = useState({
    name:"",
    price: "",
    description: "",
    image:""
  });

  const handleUpdate = async () => {
    try {
      const res = await axios.post(`${baseUrl}/products/create`,{data}, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Item updated successfully");
        setData(res.data.product);
      } else {
        toast.error("Failed to update item");
      }

    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
    }
  }

  return (
    <div>
      <h1>Add New Product</h1>
      <form>
        <input type="text" placeholder="Product Name" />
        <input type="text" placeholder="Price" />
        <textarea placeholder="Description"></textarea>
        <input type="file" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProducts
