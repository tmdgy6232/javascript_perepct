import CartIcon from "../Cart/CartIcon";
import clasees from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  return (
    <button className={clasees.button}>
      <span className={clasees.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={clasees.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
