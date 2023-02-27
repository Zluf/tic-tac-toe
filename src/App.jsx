import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  // Reset Game
  const newGame = () => {
    setBoard(Array(9).fill(null));
    winner !== "tie" && setPlayer(winner);
    setWinner(null);
  };

  const setScore = (winr) => {
    winr === "X" && setScoreX((prevScore) => prevScore + 1);
    winr === "O" && setScoreO((prevScore) => prevScore + 1);
  };

  const clickHandler = (i) => {
    // Guard Clause:
    // a) there's a winner;
    // b) position(s) already filled
    if (winner || board[i]) return;

    let newBoard = [...board];
    newBoard[i] = player;
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

    // Checking if each square of a winning sequence is marked by the same player
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

    // if there's no winning sequence, the winner stays null
    return null;
  };

  // Status display: "Next Player" & "Winner"
  let status = "";
  if (winner && winner !== "tie") status = `Winner: ${winner}`;
  if (winner === "tie") status = `Tie!`;
  if (!winner) status = `Next player: ${player}`;

  // Checking for Tie status
  useEffect(() => {
    board.every((sq) => sq) && setWinner("tie");
  }, [board]);

  return (
    <div className="game">
      <div className="score">
        <h2>Score</h2>
        <div className="score-box">
          <span className="score-box--sub score__player--x">X</span>
          <span className="score-box--sub score__count--o">{`${scoreX}`}</span>
        </div>
        <div className="score-box">
          <span className="score-box--sub score__player--x">O</span>
          <span className="score-box--sub score__count--o">{`${scoreO}`}</span>
        </div>
      </div>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((_, i) => {
          return (
            <div className="square" key={i} onClick={() => clickHandler(i)}>
              {board[i]}
            </div>
          );
        })}
      </div>
      {winner && (
        <button className="reset" onClick={newGame}>
          New Game
        </button>
      )}
      <div className="container">
        <div className="line line1"></div>
        <div className="line line2"></div>
      </div>
      <div className="arcContain">
        <div className="archide archideLeft">
          <div className="arc"></div>
        </div>
        <div className="archide">
          <div className="arc"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
