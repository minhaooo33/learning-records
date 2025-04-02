import { useInput } from "../hooks/useInput";
import Input from "./input";
import { isEmail, isNotEmpty ,hasMinLength } from "../util/validation";

export default function StateLogin() {

  const {
    enterValue,
    handleEnterValue,
    handleInputBlur,
    handleReset,
    inputIsInvalid
  } = useInput({
    email:{ value:"",didBlur:false},
    password:{ value:"",didBlur:false},
  },{
    email: (value) => isNotEmpty(value) && isEmail(value), //  驗證 email
    password: (value) => isNotEmpty(value) && hasMinLength(value, 6), //  驗證密碼長度
  })

  function handleSubmit(event) {
    event.preventDefault();

  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">

        <Input 
              label="Email" 
              id="email" 
              type="email"
              name="email"
              onChange={(handleEnterValue)}
              value={enterValue.email.value}
              onBlur={handleInputBlur}
              error={inputIsInvalid && "please enter a valid Email."}
              />
       
       <Input 
              label="Password" 
              id="password" 
              type="password"
              name="password"
              onChange={handleEnterValue}
              value={enterValue.password.value}
              error={inputIsInvalid && "please enter a valid password."}
              />

       
      </div>

      <p className="form-actions">
        <button className="button button-flat" type="button" onClick={handleReset}>Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
