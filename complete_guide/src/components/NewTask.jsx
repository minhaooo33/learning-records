import { useState } from "react";
import Button from "./Button";
export default function NewTask({onAddTask}) {

    const [enterTask, setEnterTask] = useState("");

    function handleAddTask(e) {
        setEnterTask(e.target.value);
    };

    function handleClick(){
        if(enterTask.trim() === ""){
            return;
        }
        onAddTask(enterTask);
        setEnterTask("");
    };
        
    return (
        <div className="flex gap-4 items-center">
            <input value={enterTask} onChange={handleAddTask} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
            <Button onClick={handleClick}>Add Task</Button>
        </div>
    );
};