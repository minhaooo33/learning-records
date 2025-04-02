import { useState } from "react";

        export default function PlayerArea({ initialName, symbol ,isActive,onChangeName}) {
          const [isEditing, setIsEditing] = useState(false);
          const [thePlayerName, setThePlayerName] = useState(initialName);
        
          function handleEditClick() {
             //setIsEditing(!isEditing)
             //這種方法在某些情況下可能會導致狀態更新不正確
             //behind 他不是立即執行
            setIsEditing((prevIsEditing) => !prevIsEditing);
          }
        
          function handleChangePlayerName(e) {
            setThePlayerName(e.target.value);
            if(isEditing){
              onChangeName(symbol,thePlayerName)
            }
            
          }
        
          let playerName =  <span className="player-name">{thePlayerName}</span>;;
          let btnName = isEditing ? "Save" : "Edit";
        
          if (isEditing) {
            playerName = (
              <input
                type="text"
                value={thePlayerName}
                onChange={handleChangePlayerName}
                required
              />
            );
          } 
          return (
            <li className={isActive ? "active" : undefined}> 
              <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
              </span>
              <button onClick={handleEditClick}>{btnName}</button>
            </li>
          );
        }