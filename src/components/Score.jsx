import React from "react";
import "./Score.css";

export default function Score(props) {
  return (
    <div className="score">
      <h2>Score</h2>
      <div className="score-box">
        <span className="score-box--sub score__player--x">X</span>
        <span className="score-box--sub score__count--o">{`${props.scoreX}`}</span>
      </div>
      <div className="score-box">
        <span className="score-box--sub score__player--x">O</span>
        <span className="score-box--sub score__count--o">{`${props.scoreO}`}</span>
      </div>
    </div>
  );
}
