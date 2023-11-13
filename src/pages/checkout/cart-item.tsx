import { IProduct } from "../../types/types";

interface Props {
  product: IProduct;
}

export const CartItem = (props: Props) => {
  const { _id, productName, price, imageURL } = props.product;
  return (
    <div className="cartItem">
      <img src={imageURL} alt="" />
      <div className="description">
        <h3>{productName}</h3>
        <p>Price: ${price}</p>
      </div>
    </div>
  );
};
