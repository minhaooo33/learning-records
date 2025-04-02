import { useRef, useState } from "react";

export default function RefLogin() {
const [inputIsInvalid, setInputisInvalid] = useState(false);

const email = useRef();
const password = useRef();

  function handleSubmit (event) {
    event.preventDefault();
  
    const enteredMail = email.current.value;
    const enteredPassword = password.current.value;
    console.log(enteredMail,enteredPassword);

    const checkInputIsInvalid = enteredMail.includes("@");

    if(!checkInputIsInvalid){
      setInputisInvalid(true);
      return
    }
    setInputisInvalid(false);
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" 
                 type="email"
                 name="email"
                 ref={email}/>

          <div className="control-error">{inputIsInvalid && <p>please enter a email address.</p>}</div>
        
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" 
                 type="password" 
                 name="password" 
                 ref={password}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
