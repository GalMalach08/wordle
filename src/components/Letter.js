import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPosition, attemptValue }) => {
  const { board, chosenWord, attemptVal, setDisabledLetters } =
    useContext(AppContext);
  const letter = board[attemptValue][letterPosition];
  let mes = "";

  const correct =
    attemptVal > attemptValue
      ? chosenWord[letterPosition].toUpperCase() === letter
        ? true
        : false
      : false;
  const almost =
    !correct && letter !== "" && chosenWord.includes(letter.toLowerCase())
      ? true
      : false;

  mes =
    attemptVal > attemptValue
      ? correct
        ? "correct"
        : almost
        ? "almost"
        : "error"
      : "";

  useEffect(() => {
    if (letter !== "") {
      if (correct) {
        setDisabledLetters((prev) => [...prev, { letter, correct: true }]);
      } else if (almost) {
        setDisabledLetters((prev) => [...prev, { letter, almost: true }]);
      } else {
        setDisabledLetters((prev) => [...prev, { letter }]);
      }
    }
  }, [attemptVal]);

  return (
    <div className={`letter ${mes} ${letter !== "" ? "filled" : ""}`}>
      {letter}
    </div>
  );
};

export default Letter;
