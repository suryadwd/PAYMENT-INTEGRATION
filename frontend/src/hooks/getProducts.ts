import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL; // or however you access it

export const getProducts = () => {

  const [products, setProducts] = useState([])

   const fetchProducts = async () => {

    try {
      const res = await axios.get(`${baseUrl}/products/`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setProducts(res.data.products);
      }

    } catch (error) {
      console.error("Error updating item:", error);
    }
    };

  useEffect(() => {
   
    fetchProducts();
  }, [fetchProducts, products]);

  return { products, fetchProducts};
};
