import { IProduct } from "../../types/types";

interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;

  return (
    <div className="product">
      <img src={imageURL} alt="" />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>

      <button className="add-to-cart-btn">Add to Cart</button>
      <div className="stock-quantity">
        {stockQuantity === 0 && <h1>OUT OF STOCK</h1>}
      </div>
    </div>
  );
};
