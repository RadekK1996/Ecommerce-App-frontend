import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../types/types";
import { Product } from "./product";

import "./styles.css";

export const ShopPage = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return (
    <div className="shop">
      <div className="products">
        {products !== null ? (
          products.map((product: IProduct) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
