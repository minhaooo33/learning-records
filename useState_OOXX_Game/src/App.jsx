import { useState } from "react"
import GameBoard from "./components/GameBoard"
import PlayerArea from "./components/PlayerArea"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
const PLAYERS = {
  X:"player 1",
  O:"player 2",
};
const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";

        if(gameTurns.length > 0 && gameTurns[0].player === "X"){
          currentPlayer = "O";
        };
        return currentPlayer;
};

function deriveGameBoard(gameTurns){
//這裡導出狀態
    //減少管理狀態並嘗試從state獲取更多訊息或值
    let gameBoard = [...initialGameBoard.map(array=>[...array])];
    //一定要深拷貝 確保是新的數組
    for (const turn of gameTurns){
        const {square,player} = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard
  }

function deriveWinner(gameBoard,players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    
    if(firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol&&
       firstSquareSymbol === thirdSquareSymbol
    ){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

function App() {
  const[players,setPlayers]= useState(PLAYERS);
    //const[activePlayer,setActivePlayer]=useState("X");
    const [gameTurns,setGameTurn]= useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard=deriveGameBoard(gameTurns)
    const winner= deriveWinner(gameBoard,players)
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex,colIndex){
      //setActivePlayer((curActivePlayer)=>curActivePlayer === "X" ? "O" : "X");
      setGameTurn((prevGameTurns)=>{
        
        const currentPlayer = deriveActivePlayer(prevGameTurns);
        
        const updateTurns = [
          {square:{row:rowIndex,col:colIndex} ,player:currentPlayer},
          ...prevGameTurns,
        ];

        return updateTurns;
      });
    }

  function handleChangePlayerName(symbol,newName){
    setPlayers(prevPlayer =>{
      return{
        ...prevPlayer,
        [symbol]:newName
      }
    }

    )
  }

  function handleRestart(){
    setGameTurn([]);
  }

  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">

      <PlayerArea 
      initialName={PLAYERS.X}
      symbol="X" 
      isActive={activePlayer==="X"}
      onChangeName={handleChangePlayerName}/>

      <PlayerArea 
      initialName={PLAYERS.O}
      symbol="O" 
      isActive={activePlayer==="O"}
      onChangeName={handleChangePlayerName}/>

      </ol>

      {(winner||hasDraw) && <GameOver winner={winner} rematch={handleRestart}/>}

      <GameBoard 
      onSelectSquare={handleSelectSquare} 
      board={gameBoard}/>

      </div>

      <Log turns={gameTurns}/>

    </main>
  )
}

export default App
