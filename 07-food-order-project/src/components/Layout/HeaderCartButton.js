import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import clasees from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const buttonClasses = `${clasees.button} ${
    btnIsHighlighted ? clasees.bump : ""
  }`;

  const { items } = cartCtx;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={buttonClasses} onClick={props.onShowCart}>
      <span className={clasees.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={clasees.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
