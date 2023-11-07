import { useEffect, useState } from "react";
import axios from "axios";
import { useGetToken } from "./useGetToken";
import { Product } from "../types/types";

export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const { headers } = useGetToken();

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get("http://localhost:3001/product", {
        headers,
      });
      setProducts(fetchedProducts.data.products);
    } catch (err) {
      alert("ERROR: Something went wrong"); // @TODO handle errors better way
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};
