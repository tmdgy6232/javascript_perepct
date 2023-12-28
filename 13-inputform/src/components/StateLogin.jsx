import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailError,
  } = useInput("", (value) => {
    return isEmail(value) && isNotEmpty(value);
  });

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();
    if (emailError || passwordError) return;
    console.log(emailValue, passwordValue);
  }

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
            value={emailValue}
            name="email"
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            error={emailError && "Pleas Check Email"}
          />
        </div>

        <div className="control no-margin">
          <Input
            label="password"
            id="password"
            type="password"
            value={passwordValue}
            name="password"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            error={passwordError && "Please Check Password"}
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
