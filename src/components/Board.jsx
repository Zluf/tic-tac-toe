import React from "react";
import X from "./X";
import O from "./O";
import "./Board.css";

export default function Board(props) {
  return (
    <div className="board">
      {props.board.map((_, i) => {
        return (
          <div
            className="square"
            key={i}
            onClick={() => props.onClickHandler(i)}
          >
            {props.board[i] === "X" && <X />}
            {props.board[i] === "O" && <O />}
            {i === props.winningSeq.field && (
              <div
                className="strike"
                style={{
                  animation: `${props.winningSeq.dir} 0.5s linear forwards 0.5s`,
                }}
              ></div>
            )}
            {!props.board[i] && (
              <div className="square__hover-state">
                {props.player === "X" && <X />}
                {props.player === "O" && <O />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
