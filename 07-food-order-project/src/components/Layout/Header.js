import React from "react";
import mainImage from "../../asset/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mainImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
