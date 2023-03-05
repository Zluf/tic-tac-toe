import React, { useEffect, useState } from "react";
import "./App.css";
import Score from "./components/Score";
import Board from "./components/Board";
import { transform } from "esbuild-wasm";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [winningSeq, setWinningSeq] = useState({
    field: null,
    seq: [],
    dir: "",
  });
  const winningSequencesAll = [
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

  // Reset Game
  const newGame = () => {
    setWinningSeq({ field: null, seq: [], dir: "" });
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
    // b) field already filled
    if (winner || board[i]) return;

    let newBoard = [...board];
    newBoard[i] = player;
    setBoard(newBoard);

    const newPlayer = player === "X" ? "O" : "X";
    setPlayer(newPlayer);

    const newWinner = calculateWinner(newBoard);
    setWinner(newWinner);
  };

  const calculateWinner = (currentBoard) => {
    const winningSequences = winningSequencesAll.map((arr) => arr.toString());

    // Checking if each square of a winning sequence is marked by the same player
    for (let i = 0; i < winningSequencesAll.length; i++) {
      const [a, b, c] = winningSequencesAll[i];
      const abcStr = [a, b, c].toString();
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setScore(currentBoard[a]);
        setWinningSeq({
          field: a,
          seq: [a, b, c],
          dir:
            abcStr === winningSequences[0] ||
            abcStr === winningSequences[1] ||
            abcStr === winningSequences[2]
              ? "leftToRight"
              : abcStr === winningSequences[3] ||
                abcStr === winningSequences[4] ||
                abcStr === winningSequences[5]
              ? "topToBottom"
              : abcStr === winningSequences[6]
              ? "topLeftToBottomRight"
              : abcStr === winningSequences[7]
              ? "topRightToBottomLeft"
              : "",
        });
        return currentBoard[a];
      }
    }

    // if there's no winning sequence, the winner stays null
    return null;
  };

  // Status display: "Next Player" / "Winner" / "Tie"
  let status = "";
  if (winner && winner !== "tie") status = `Winner: ${winner}`;
  if (winner === "tie") status = `Tie!`;
  if (!winner) status = `Next player: ${player}`;

  useEffect(() => {
    // Checking for Tie status
    board.every((sq) => sq) && !winner && setWinner("tie");
  }, [board, winner]);

  return (
    <div className="game">
      <Score scoreX={scoreX} scoreO={scoreO} />
      <div className="status">{status}</div>
      <Board
        player={player}
        winningSeq={winningSeq}
        board={board}
        onClickHandler={clickHandler}
      />
      {winner && (
        <button className="reset" onClick={newGame}>
          New Game
        </button>
      )}
    </div>
  );
};

export default App;
