import { useGetProducts } from "../../hooks/useGetProducts";
import { Product } from "../../types/types";

export const ShopPage = () => {
  const { products } = useGetProducts();
  return (
    <div className="shop">
      <div className="products">
        {products !== null ? (
          products.map((product: Product) => (
            <div key={product._id}>
              {product.productName} {product.price}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
