import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({onAddProject, onCancelProject}) {
  const modal = useRef(null);

  const title = useRef(null);
  const description = useRef(null);
  const duDate = useRef(null);

function handleSave(){
  const enteredTitle = title.current.value;
  const enteredDescription = description.current.value;
  const enteredDuDate = duDate.current.value;

  // 這裡應該要做一些檢查，確保輸入的資料是有效的
  if(
    enteredTitle===""||
    enteredDescription===""||
    enteredDuDate==="")
    {
    modal.current.open();
    return;
  }

  onAddProject({
    title: enteredTitle,
    description: enteredDescription,
    dueDate: enteredDuDate
  });
  //這裡應該要傳遞一個物件，作為參數projectData
}

 return (   
  <>
  <Modal ref={modal} buttonCaption="Close">
    <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
    <p className="text-stone-600 mb-4">Oops ... loos liks you forgot to enter a value.</p>
    <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field.</p>
  </Modal>
  <div className="w-[35rem] mt-16">
    <menu className="flex items-center justify-end gap-4 my-4">
    <li>
        <button  
        onClick={handleSave}
        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
          Save
        </button>
        </li>
      <li>
        <button 
        className="text-stone-800 hover:text-stone-950"
        onClick={onCancelProject}>
          Cancel
        </button>
        </li>
    </menu>
      <div>
       <Input ref={title} label="Project Name" type="text"/>
       <Input ref={description} label="Description" textarea={true}/>
       <Input ref={duDate} label="Due Date" type="date"/>
      </div>
  </div>
  </>
 );
}