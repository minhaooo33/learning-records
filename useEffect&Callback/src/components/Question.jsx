import { useState } from "react"
import QuestionTimer from "./QuestionTimer"
import Answers from "./Answers"
import QUESTIONS from "../questions"

export default function Question({index,onSelectAnswer,onSkipAnswer}){
const [answer,setAnswer] = useState({
    selectedAnswer:"",
    isCorrect:null
})

let timer = 10000;

if(answer.selectedAnswer){
    timer = 1000;
}

if(answer.isCorrect !==null){
    timer = 2000;
}

function handleSelectAnswer(answer){
setAnswer({
selectedAnswer:answer,
isCorrect:null
})
setTimeout(()=>{
    setAnswer({
        selectedAnswer:answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
        })

        setTimeout(()=>{
            onSelectAnswer(answer)
        },2000)
},1000)
};

let answerState = "";

if(answer.selectedAnswer && answer.isCorrect !==null){
    answerState = answer.isCorrect ? "correct" : "wrong"; 
}else if(answer.selectedAnswer){
answerState = "answered"
}

    return(
         <div id="questions">
                    <QuestionTimer 
                    key={timer}
                    timeout={timer} 
                    //如果用戶選了一個答案 要向上更新計時器 
                    // 只有向用戶展示正確或錯誤答案後 這個計時器才會到期
                    onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
                    mode={answerState}/>
                <h2>{QUESTIONS[index].text}</h2>
                <Answers answers={QUESTIONS[index].answers}
                         selectedAnswer={answer.selectedAnswer}
                         answerState={answerState}
                         onSelect={handleSelectAnswer}/>
                </div>
    )
}