import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';



export const getProducts = () => {

  const [products, setProducts] = useState([])

   const fetchProducts = async () => {

    try {
      const res = await axiosInstance.get(`api/products/`, {
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
