import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../types/types";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";

import "./styles.css";
import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const { getCartItemCount, getTotalCountAmount } =
    useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  const navigate = useNavigate();

  const totalAmount = getTotalCountAmount();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products &&
          products.map((product: IProduct) => {
            if (getCartItemCount(product._id) !== 0) {
              return <CartItem key={product._id} product={product} />;
            }
            return null;
          })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: {totalAmount.toFixed(2)}$</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>Your Shopping Cart is empty</h1>
      )}
    </div>
  );
};
