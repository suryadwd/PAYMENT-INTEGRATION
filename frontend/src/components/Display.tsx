import Navbar from "./Navbar";
import { useUserData } from "../hooks/getuserData";
import { getProducts } from "../hooks/getProducts";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
type Product = {
  image: string;
  name: string;
  price: number;
  description: string;
  _id: string;
};

const Display = () => {
  const { role } = useUserData();
  const { products, fetchProducts } = getProducts() as { products: Product[] };

  const baseUrl = import.meta.env.VITE_BASE_URL;
  

 const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${baseUrl}/products/delete/${id}`,   {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Item deleted successfully");
        fetchProducts(); // Refresh the product list after deletion
      } else {
        toast.error("Failed to delete item");
      }

    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Navbar />

      {products.length === 0 ? (
        <div>
          <h1>No products found</h1>
        </div>
      ) : (
       

        products.map((products) => (
          
           <div key={products._id} className=" flex flex-col items-center justify-center border-4 border-blue-500 rounded-lg p-1 bg-white text-black">
          <div className="">
            <img className="h-40 w-36 object-contain " src={products.image} alt="Display" />
          </div>

          <div className="flex flex-col items-center justify-center relative p-2">
            <div className="mb-[-1] flex items-center justify-between w-full">
              <div className="text-xl font-extrabold  ">{products.name}</div>
              <div className="text-xl font-extrabold">₹ {products.price}</div>
            </div>
            <div className="font-light text-gray-400 mb-1">
              {products.description}
            </div>
            <div className="flex items-center justify-evenly w-full gap-2">
              {role === "user" ? (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Buy Now{" "}
                </button>
              ) : (
                <>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <Link to={`/update/${products._id}`}>Update</Link>
                  </button>
                  <button onClick={() => handleDelete(products._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        ))

       
      )
      
      }
    </div>
  );
};

export default Display;
