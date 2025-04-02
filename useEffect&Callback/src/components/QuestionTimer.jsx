import { useState ,useEffect} from "react";

export default function QuestionTimer({ timeout ,onTimeout,mode}) {
    const [remainingTime,setRemainingTime]=useState(timeout);

    useEffect(()=>{
        const timer = setTimeout(onTimeout,timeout);
        //如果不使用useEffect這樣會創造多個計時器啟動和運行
        return () => {clearTimeout(timer);}
    },[onTimeout,timeout]);
    //因為這裡接收兩個prop所以必須確保 依賴項發生更改時重新執行此函數

    useEffect(()=>{
        const interval = setInterval(()=>{
            setRemainingTime(prevremainingTime=>prevremainingTime-100)
        },100);
        //如果不使用useEffect這裡會無限循環 因為這邊『更新remainingTime』狀態
        return () => {clearInterval(interval);}
    },[]);
    
    
    return(
        <progress id='question-time' 
                  max={timeout}     
                  value={remainingTime}
                  className={mode}/>
    )
};
    
