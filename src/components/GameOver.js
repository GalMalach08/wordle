import React, { useContext } from "react";
import { AppContext } from "../App";
const GameOver = () => {
  const { gameOver, chosenWord, attemptVal } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h1>{gameOver.success ? "Good job" : "Failed"}</h1>
      <h3>The word is {chosenWord}</h3>
      {gameOver.success && <h3>You guessed in {attemptVal} guesses</h3>}
    </div>
  );
};

export default GameOver;
