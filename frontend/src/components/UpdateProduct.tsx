import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
const UpdateProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const filteredData = Object.fromEntries(
  Object.entries(data).filter(([_, value]) => value !== "")
);


  const navigate = useNavigate();

  const { id } = useParams(); 

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.post(`/products/update/${id}`, filteredData , {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Item updated successfully");
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
      <h1 className="text-3xl font-bold text-center p-3">Update Product</h1>

        <input className="mb-3 border border-white rounded-lg  p-2 text-white" onChange={ e => setData({...data, name:e.target.value})} type="text" placeholder="Update Name" />
        <input className="mb-3 border rounded-lg  p-2 text-white" onChange={ e => setData({...data, price:e.target.value})} type="text" placeholder="Update Price" />
        <textarea className="mb-3 border rounded-lg  p-2 text-white" onChange={e => setData({...data, description:e.target.value})} placeholder="Update Description"></textarea>
        <input className="mb-3 border rounded-lg  p-2 text-white resize-none" onChange={e => setData({...data, image:e.target.value})} placeholder="Update Image" />
        <button className="bg-green-400 hover:bg-green-700 p-3 rounded-lg" onClick={handleUpdate} type="submit">Update Product</button>

    </div>
  )
}

export default UpdateProduct
