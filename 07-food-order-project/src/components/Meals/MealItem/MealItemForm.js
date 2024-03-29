import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandelr = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  const inputProps = {
    input: {
      id: "amount_" + props.id,
      type: "number",
      min: "1",
      max: "5",
      step: "1",
      defaultValue: "1",
    },
    label: "Amount",
  };
  return (
    <form className={classes.form} onSubmit={submitHandelr}>
      <Input {...inputProps} ref={amountInputRef} />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5). </p>}
    </form>
  );
};

export default MealItemForm;
