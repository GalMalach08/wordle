import React, { useState, createContext, useEffect } from "react";
import Board from "./components/Board";
import Keyboard from "./components/KeyBoard";
import GameOver from "./components/GameOver";
import { boardDefault, generateWordsSet } from "./utils";
import "./style.css";

export const AppContext = createContext();

const App = () => {
  const [board, setBoard] = useState(boardDefault);
  const [letterPosition, setLetterPosition] = useState(0);
  const [attemptValue, setAttemptValue] = useState(0);
  const [wordsSet, setWordsSet] = useState(new Set());
  const [chosenWord, setChosenWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({ gameOver: false, success: false });
  const [alert, setAlert] = useState(false);
  const selectLetter = (keyVal) => {
    if (keyVal === "ENTER") {
      sumbitWord(keyVal);
    } else if (keyVal === "DELETE") {
      deleteWord();
    } else if (letterPosition <= 4) {
      const newBoard = [...board];
      newBoard[attemptValue][letterPosition] = keyVal;
      setBoard(newBoard);
      setLetterPosition((prev) => prev + 1);
    }
  };

  const sumbitWord = () => {
    if (letterPosition !== 5) return;

    let currentWord = `${board[attemptValue].join("").toLocaleLowerCase()}`;
    if (wordsSet.has(currentWord.toLowerCase())) {
      setAttemptValue((prev) => prev + 1);
      setLetterPosition(0);
      if (currentWord === chosenWord) {
        setGameOver((prev) => {
          return { ...prev, gameOver: true, success: true };
        });
        return;
      }

      if (attemptValue === 5) {
        setGameOver((prev) => {
          return { ...prev, gameOver: true, success: false };
        });
        return;
      }
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  const deleteWord = () => {
    if (letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[attemptValue][letterPosition - 1] = "";
    setBoard(newBoard);
    setLetterPosition((prev) => prev - 1);
  };

  useEffect(() => {
    generateWordsSet().then(({ wordSet, todaysWord }) => {
      setWordsSet(wordSet);
      setChosenWord(todaysWord);
    });
  }, []);

  return (
    <>
      <nav>
        <h1>Wordle</h1>
      </nav>
      <div className="container m-auto">
        <AppContext.Provider
          value={{
            board,
            setBoard,
            selectLetter,
            chosenWord,
            attemptVal: attemptValue,
            disabledLetters,
            setDisabledLetters,
            setGameOver,
            gameOver,
          }}
        >
          <div className="game">
            <Board />
            {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </div>
        </AppContext.Provider>
        {alert && (
          <div className="alert">The word doesnt excist on the list</div>
        )}
      </div>
    </>
  );
};

export default App;
