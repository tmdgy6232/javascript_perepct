import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function Login() {
  // const [enteredEamil, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });
  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
  }

  function handleInputChange(identifier, value) {
    // javascript object key 동적입력
    setEnteredValues((prev) => ({ ...prev, [identifier]: value }));
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }
  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <Input
            label="email"
            id="email"
            type="email"
            value={enteredValues.email}
            name="email"
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event.target.value)}
            error={emailIsInvalid && "Pleas Check Email"}
          />
        </div>

        <div className="control no-margin">
          <Input
            label="password"
            id="password"
            type="password"
            value={enteredValues.password}
            name="password"
            onBlur={() => handleInputBlur("password")}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            error={passwordIsInvalid && "Please Check Password"}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
