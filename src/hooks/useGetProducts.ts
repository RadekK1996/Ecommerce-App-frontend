import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../types/types";
import { IShopContext, ShopContext } from "../context/shop-context";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const { headers } = useGetToken();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

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
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  return { products };
};
