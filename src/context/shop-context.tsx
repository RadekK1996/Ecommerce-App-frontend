import { createContext, useEffect, useState } from "react";
import { IProduct } from "../types/types";
import { useGetProducts } from "../hooks/useGetProducts";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { access } from "fs";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  getTotalCountAmount: () => number;
  checkout: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
  getTotalCountAmount: () => 0,
  checkout: () => null,
  availableMoney: 0,
  purchasedItems: [],
  isAuthenticated: false,
  setIsAuthenticated: () => null,
};
export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== null
  );

  const { products } = useGetProducts();
  const { headers } = useGetToken();
  const navigate = useNavigate();

  const fetchAvailableMoney = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const res = await axios.get(
        `http://localhost:3001/user/available-money/${userID}`,
        { headers }
      );
      setAvailableMoney(res.data.availableMoney);
    } catch (err) {
      console.error("Error fetching available money", err);
    }
  };

  const fetchPurchasedItems = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const res = await axios.get(
        `http://localhost:3001/product/purchased-items/${userID}`,
        { headers }
      );
      setPurchasedItems(res.data.purchasedItems);
    } catch (err) {
      console.error("Error fetching purchased items", err);
    }
  };

  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }

    return 0;
  };

  const addToCart = (itemId: string) => {
    const product = products.find((product) => product._id === itemId);

    if (product && product.stockQuantity > 0) {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
    } else {
      alert("Cannot add an unavailable product to the cart.");
    }
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;

    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const getTotalCountAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: IProduct = products.find(
          (product) => product._id === item
        );
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const checkout = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };
    try {
      await axios.post("http://localhost:3001/product/checkout", body, {
        headers,
      });

      setCartItems({});
      fetchAvailableMoney();
      fetchPurchasedItems();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies("access_token", null);
    }
  }, [isAuthenticated]);

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
    getTotalCountAmount,
    checkout,
    availableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
