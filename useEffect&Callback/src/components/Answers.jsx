import { useRef } from "react";

export default function Answers({answers , selectedAnswer, answerState,onSelect}){
    const  shuffledAnswers = useRef();
        //這裡的代碼僅在仍然有Questions時執行
        if(!shuffledAnswers.current){
            shuffledAnswers.current = [...answers];
            //這裡創造一個新的數組 保留原本順序 因為第一個總是正確答案
            shuffledAnswers.current.sort(() => Math.random()-0.5);
        }
    return(
        <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
            const isSelected = selectedAnswer===answer;
            let cssClass = "";

            if(answerState === "answerd" && isSelected){
                cssClass = "selected"
            }

            if((answerState === "correct" || answerState === "wrong") && isSelected){
                cssClass = answerState;
            }

            return (<li key={answer} className="answer">
                <button onClick={()=>onSelect(answer)}
                        className={cssClass}
                        disabled={answerState !== ""}>
                    {answer}
                </button>
            </li>)
        }
            
        )}
    </ul>
    )
}