import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const newGame = () => {
    setBoard(Array(9).fill(null));
    winner !== "tie" && setPlayer(winner);
    setWinner(null);
  };

  const setScore = (winr) => {
    if (winr === "X") setScoreX((prevScore) => prevScore + 1);
    if (winr === "O") setScoreO((prevScore) => prevScore + 1);
  };

  const renderSquare = (index) => {
    return (
      <div className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  const handleClick = (index) => {
    // Guard Clause:
    // a) there's a winner;
    // b) position(s) already filled
    if (winner || board[index]) return;

    let newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const newPlayer = player === "X" ? "O" : "X";
    setPlayer(newPlayer);

    const newWinner = calculateWinner(newBoard);
    setWinner(newWinner);
  };

  const calculateWinner = (curBoard) => {
    const winningSequences = [
      // Horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningSequences.length; i++) {
      const [a, b, c] = winningSequences[i];
      if (
        curBoard[a] &&
        curBoard[a] === curBoard[b] &&
        curBoard[a] === curBoard[c]
      ) {
        setScore(curBoard[a]);
        return curBoard[a];
      }
    }
    return null;
  };

  const status = () => {
    if (winner && winner !== "tie") {
      return `Winner: ${winner}`;
    } else if (winner === "tie") {
      return `Tie!`;
    } else if (!winner) {
      return `Next player: ${player}`;
    }
  };

  useEffect(() => {
    // console.log(board);
    // console.log(winner);
    board.every((sq) => sq) && setWinner("tie");
  }, [board, winner]);

  return (
    <div className="game">
      <div className="score">
        <h2>Score</h2>
        <div>{`X: ${scoreX}`}</div>
        <div>{`O: ${scoreO}`}</div>
      </div>
      <div className="status">
        {status()}
        {/* {winner ? `Winner: ${winner}` : `Next player: ${player}`} */}
      </div>
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {winner && (
        <button className="reset" onClick={newGame}>
          New Game
        </button>
      )}
    </div>
  );
};

export default App;
