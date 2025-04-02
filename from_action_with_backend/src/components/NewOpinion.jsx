import { useActionState ,useContext} from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {

  const { addOpinion } = useContext(OpinionsContext);

  async function shareOpinionAction(prevState, fromData){
    const userName = fromData.get("userName");
    const title = fromData.get("title");
    const body = fromData.get("body");

    let errors = [];

    if(title.trim().length < 5){
      errors.push("Title must be at least 5 characters long.")
    }

    if(!userName.trim()){
      errors.push("Please provide your name.")
    }

    if(body.trim().length < 10 || body.trim().length > 300){
      errors.push("Opinion must to be between 10 and 300 characters long.")
    }

    if(errors.length > 0){
      return {errors, enteredValues:{
        userName,
        title,
        body
      }}
    }
    
    await addOpinion({ userName, title, body }); // ✅ 確保 addOpinions 被正確呼叫

    return { errors:null }

  }

  const [fromState, fromAction] = useActionState(shareOpinionAction, {errors:null})

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={fromAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input 
              type="text" 
              id="userName" 
              name="userName" 
              defaultValue={fromState.enteredValues?.userName}
              />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              defaultValue={fromState.enteredValues?.title}
              />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea 
            id="body" 
            name="body" 
            rows={5}
            defaultValue={fromState.enteredValues?.body}
            >

            </textarea>
        </p>

      {fromState.errors &&(
        <ul className="error">
          {fromState.errors.map((error) => (
            <li key={error}>{error}</li>))}
        </ul>
      )}

      <Submit />
        
      </form>
    </div>
  );
}
