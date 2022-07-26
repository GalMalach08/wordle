import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal }) => {
  const { selectLetter, disabledLetters } = useContext(AppContext);
  let correct;
  let almost;
  let disabled;
  if (disabledLetters.length !== 0) {
    disabledLetters.forEach((disLetter) => {
      if (disLetter.letter === keyVal) {
        if (disLetter.correct) {
          correct = true;
        } else if (disLetter.almost) {
          almost = true;
        } else {
          disabled = true;
        }
      }
    });
  }

  return (
    <div className="row_words">
      <div
        className={`key ${
          keyVal === "ENTER" || keyVal === "DELETE" ? "big" : ""
        }
      ${correct ? "correct" : almost ? "almost" : disabled ? "disabled" : ""}
      `}
        onClick={() => selectLetter(keyVal)}
      >
        {keyVal}
      </div>
    </div>
  );
};

export default Key;
