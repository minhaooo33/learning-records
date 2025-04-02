import Header from "./components/Header"
import InputContainer from "./components/InputContainer"
import Results from "./components/Results" 
import React, {useState} from 'react';

function App() {

  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const inputIsValid = userInput.duration >=1;

  function handleChange(inputIndentifier,newValue){
    
    setUserInput((prevValue) => {
      return {
        ...prevValue,
        [inputIndentifier]: + newValue
      }
    });
  }

  return (
    <>
    <Header />
    <InputContainer userInput={userInput} onChange={handleChange}/>
    {!inputIsValid && <p className="center">Please enter a valid duration</p>}
    {inputIsValid && <Results input={userInput}/> }
    </>
  )
}

export default App
