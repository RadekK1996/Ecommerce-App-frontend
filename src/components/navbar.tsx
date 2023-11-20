import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { useCookies } from "react-cookie";

export const NavBar = () => {
  const { availableMoney } = useContext<IShopContext>(ShopContext);
  const [, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    localStorage.clear();
    setCookies("access_token", null);
  };
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>RK SHOP</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Shop</Link>
        <Link to="/purchased-items">Purchases</Link>
        <Link to="/checkout">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        <Link to="/auth" onClick={logout}>
          Logout
        </Link>
        <span>${availableMoney.toFixed(2)}</span>
      </div>
    </div>
  );
};
