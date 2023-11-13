import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../types/types";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";

import "./styles.css";

export const CheckoutPage = () => {
  const { getCartItemCount } = useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products ? (
          products.map((product: IProduct) => {
            if (getCartItemCount(product._id) !== 0) {
              return <CartItem key={product._id} product={product} />;
            }
            return null;
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};
