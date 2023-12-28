import { useState } from "react";

export function useInput(defultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defultValue);

  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);
  function handleInputChange(event) {
    // javascript object key 동적입력
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
