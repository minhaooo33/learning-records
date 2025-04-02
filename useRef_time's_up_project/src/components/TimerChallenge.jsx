import React, { useState ,useRef } from "react";
import ResultModal from "./ResultModal";
export default function TimmerChallenge({title,targetTime}){
    const dialog = useRef(null);
    //let timer; 不能這樣使用，因為在函數結束後會被清除
    const timer=useRef(null);//這樣就可以在函數結束後保留timer的值
    //如果有必續管理的值，他不是一個state，因為計時器本身對ui沒有影響
    //所以不需要重新渲染，所以不需要使用useState
    const [timeRemaining,setTimeRemaining]=useState(targetTime*1000);

    const timerIsActive=timeRemaining>0&&timeRemaining<targetTime*1000;
    
    if(timeRemaining<=0){
        clearInterval(timer.current);
        dialog.current.open();
        //這裡的open()是ResultModal.jsx中的useImperativeHandle()方法
    }
    function handleReset(){
        setTimeRemaining(targetTime*1000);
    }
    function handleStart(){
        timer.current=setInterval(()=>{
            setTimeRemaining(prevTimeRemaining=>prevTimeRemaining-10);
        },10);
    }

    function handleStop(){
        clearInterval(timer.current);
        dialog.current.open();
    }

    return (
        <>
       <ResultModal 
       ref={dialog} 
       remainingTime={timeRemaining}  
       targetTime={targetTime} 
       onReset={handleReset}/>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
                {timerIsActive ? "Stop" : "Strat"} Challenge
            </button>
        </p>
            <p className={timerIsActive ? "active" : undefined}>
            {timerIsActive ? "Time is running...." : "Timer inactivated"}
            </p>
      </section>
      </>
    );
}