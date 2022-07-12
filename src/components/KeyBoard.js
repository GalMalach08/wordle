import React, { useState, useEffect, useCallback, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";
const KeyBoard = () => {
  const { selectLetter, letterPosition, attemptValue } = useContext(AppContext);
  const [lineOne, setlineOne] = useState([
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
  ]);
  const [lineTwo, setlineTwo] = useState([
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
  ]);
  const [lineThree, setlineThree] = useState([
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ]);

  const handleKeyBoard = useCallback(
    (e) => {
      console.log(e.key);
      const keysArr = lineOne.concat(lineTwo.concat(lineThree.concat()));
      if (e.key === "Enter") return selectLetter("ENTER");
      if (e.key === "Backspace") return selectLetter("DELETE");

      keysArr.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          selectLetter(key);
        }
      });
    },
    [selectLetter, lineOne, lineTwo, lineThree]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyBoard);
    return () => {
      document.removeEventListener("keydown", handleKeyBoard);
    };
  }, [handleKeyBoard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyBoard}>
      <div className="line1">
        {lineOne.map((letter) => (
          <Key key={letter} keyVal={letter} />
        ))}
      </div>
      <div className="line2">
        {lineTwo.map((letter) => (
          <Key key={letter} keyVal={letter} />
        ))}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} />
        {lineThree.map((letter) => (
          <Key key={letter} keyVal={letter} />
        ))}
        <Key keyVal={"DELETE"} />
      </div>
    </div>
  );
};

export default KeyBoard;
