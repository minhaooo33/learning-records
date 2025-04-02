import { useState ,useCallback} from "react";
import Question from "./Question";
import QUESTIONS from "../questions"
import Summary from "./Summary";

export default function Quiz(){
    //const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    //可以透過activeQuestionIndex來得出當前問題
    //如果我們的數組中有兩個答案 現在可以呈現第三個問題給用戶 
    //userAnswers = ["A","B"] => 呈現第三個問題給用戶 
    //這樣就不需要activeQuestionIndex的state
    const [userAnswers, setUserAnswers]  = useState([]);
    const activeQuestionIndex = userAnswers.length;
    
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer=useCallback(function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers,selectedAnswer] // 將答案加入userAnswers陣列
        })
    },[]);

    const handleSkipAnswers = useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer])
    //JS中的函數式是值，它們是對象，當代jsx代碼被求值時，原本方法是內存中創建的新對象
    //因此每當組建中的代碼被重新評估時
    //<QuestionTimer timeout={10000} onTimeout={()=>handleSelectAnswer(null)}/>
    //這裡就會創造一個新函數「即便他們的名稱代碼都依樣」，所以需要使用useCallback，確保函數不會被重建

    if(quizIsComplete){
        return(
    <Summary userAnswers={userAnswers}/>
        )
    }   

    return (
        <div id = "quiz">
        <Question
                index = {activeQuestionIndex}
                key = {activeQuestionIndex}
                            //這裡的key props的目的是 每當他在組建上發生變化時，即使該組建不是列表的一部分
                            //每當activeQuestionIndex改變時，React將銷毀舊的組建實例，創建新的組建實例
                            //因此，它將卸載並重新裝載它，這樣倒計時就會被重置還有shuffledAnswers
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswers}
                   />
        </div>
    )
}