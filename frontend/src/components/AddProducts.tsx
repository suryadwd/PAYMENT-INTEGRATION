import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const AddProducts = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
 
   const [data, setData] = useState({
    name:"",
    price: "",
    description: "",
    image:""
  });

  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${baseUrl}/products/create`, data , {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Item added successfully");
        setData(res.data.product);
        console.log(res.data)
        navigate('/store');
      } else {
        toast.error("Failed to update item");
      }

    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
    }
  }

  return (
    <div className="flex flex-col item-center gap-3 bg-zinc-700 text-black p-5">
      <h1 className="text-3xl font-bold text-center p-3">Add New Product</h1>
      
        <input className="mb-3 border border-white rounded-lg  p-2 text-white" onChange={ e => setData({...data, name:e.target.value})} type="text" placeholder="Product Name" />
        <input className="mb-3 border rounded-lg  p-2 text-white" onChange={ e => setData({...data, price:e.target.value})} type="text" placeholder="Price" />
        <textarea className="mb-3 border rounded-lg  p-2 text-white" onChange={e => setData({...data, description:e.target.value})} placeholder="Description"></textarea>
        <input className="mb-3 border rounded-lg  p-2 text-white resize-none" onChange={e => setData({...data, image:e.target.value})} placeholder="Image" />
        <button className="bg-green-400 hover:bg-green-700 p-3 rounded-lg" onClick={handleAdd} type="submit">Add Product</button>
      
    </div>
  )
}

export default AddProducts
