import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import clasees from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <button className={clasees.button} onClick={props.onShowCart}>
      <span className={clasees.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={clasees.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
