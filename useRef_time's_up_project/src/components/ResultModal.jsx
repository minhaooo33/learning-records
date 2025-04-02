import{ createPortal }from "react-dom"
import { useImperativeHandle ,useRef } from "react";

export default function ResultModal({ref,targetTime,remainingTime,onReset}){ 
    const userLost=remainingTime<=0;
    const formattedReaminingTime=(remainingTime/1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    //這個dialog是一個對話框，所以要使用useRef，傳給下面的dialog ref
    const dialog = useRef(null);
    //useImperativeHandle() 讓 TimerChallenge.jsx 取得 showModal() 方法
    useImperativeHandle(ref,()=>({
            open(){
                dialog.current.showModal();
            }
    }),[]);

    return createPortal(
      <dialog ref={dialog} className="result-modal">
       {userLost && <h2>Challenge Failed</h2>}
       {!userLost && <h2>Your Score: {score} </h2>}
        <p>The target time was<strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timmer with <strong>{formattedReaminingTime}seconds left.</strong></p>
        <form method="dailog" onSubmit={onReset}>
            <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
}