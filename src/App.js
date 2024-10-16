import './App.css';
import { useState, useEffect } from 'react'; 
import Square from './Components/Square';
import { Patterns } from './Patterns';

function App() {

  const [board, setBoard] = useState(["","","","","","","","",""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({winner: "none", state: "none"});

  //called if there is a change in the board
  useEffect( () => {
    //Check to see if there is a tie or a win
    checkTie();
    checkWin();
    
    //update player
    if (player === "X"){
      setPlayer("O");
    } else{
      setPlayer("X");
    }
  }, [board]);

  //called when the result is changed
  useEffect(() => {
    if(result.state !== "none"){
      document.getElementById("playerResult").innerText = `Game Finished! Winning Player: ${result.winner}`;
      document.getElementById("restartButton").style.display = "block";
    }
    
  }, [result]);

  //updates board when you select a square
  const chooseSquare = (square) => {
    setBoard(board.map((val, idx) => {
     //find the appropriate index in the map, and make sure its empty
      if (idx === square && val === ""){
        //update grid with player
        return player
      }
      return val;
    }));
  };

  const checkWin = () => {
    // Loop through each pattern in the array
    Patterns.forEach((currPattern) =>{
      // get the player of the first index of the current pattern
      const firstPlayer = board[currPattern[0]];
      //don't do this if there is no player
      if (firstPlayer === ""){
        return;
      }

      let foundWinningPattern = true;
      //loop through each grid in the pattern and make sure they all belong to same player
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer){
          foundWinningPattern = false;
        }
      })
      //set the winning result
      if (foundWinningPattern){
        setResult({winner: firstPlayer, state: "Won"})
      }
    })

  }

  //loop through all the squares and check if they are all filled
  const checkTie = () => {
    let filled = true;
    board.forEach( (square) =>{
      if(square === ""){
        filled = false;
      }
    })
    if(filled){
      setResult({winner: "None", state: "Tie"});
    }
    
  }

  // clear the board, set first player to x, and hide restart button
  const restartGame = () => {
    setBoard(["","","","","","","","",""]);
    setPlayer("X");
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("playerResult").innerText = "";
  }

  return (
    <div className="App">
      <h1>Tic-tac-toe!</h1>
      <div className='board'>
        <div className="row">
          <Square val = {board[0]} chooseSquare={() => {chooseSquare(0)}}/>
          <Square val = {board[1]} chooseSquare={() => {chooseSquare(1)}}/>
          <Square val = {board[2]} chooseSquare={() => {chooseSquare(2)}}/>
        </div>
        <div className="row">
          <Square val = {board[3]} chooseSquare={() => {chooseSquare(3)}}/>
          <Square val = {board[4]} chooseSquare={() => {chooseSquare(4)}}/>
          <Square val = {board[5]} chooseSquare={() => {chooseSquare(5)}}/>
        </div>
        <div className="row">
          <Square val = {board[6]} chooseSquare={() => {chooseSquare(6)}}/>
          <Square val = {board[7]} chooseSquare={() => {chooseSquare(7)}}/>
          <Square val = {board[8]} chooseSquare={() => {chooseSquare(8)}}/>
        </div>
      </div>
      <div className='results'>
        <h3 id="playerResult" className='playerResult'></h3>
        <button id="restartButton" className='restartButton' onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  );
}

export default App;
