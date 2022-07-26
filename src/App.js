import React, { useState, createContext, useEffect } from "react";
// Component
import Board from "./components/Board";
import Keyboard from "./components/KeyBoard";
import GameOver from "./components/GameOver";
// Utils
import { boardDefault, generateWordsSet } from "./utils";
// Style
import "./style.css";
// App context
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

  // Select a letter
  const selectLetter = (keyVal) => {
    if (keyVal === "ENTER") {
      sumbitWord(keyVal);
    } else if (keyVal === "DELETE") {
      deleteLetter();
    } else if (letterPosition <= 4) {
      const newBoard = [...board];
      newBoard[attemptValue][letterPosition] = keyVal;
      setBoard(newBoard);
      setLetterPosition((prev) => prev + 1);
    }
  };

  // Submit a word
  const sumbitWord = () => {
    if (letterPosition !== 5) return;
    let currentWord = `${board[attemptValue].join("").toLocaleLowerCase()}`;
    if (wordsSet.has(currentWord.toLowerCase())) {
      setAttemptValue((prev) => prev + 1);
      setLetterPosition(0);
      if (currentWord === chosenWord) {
        setTimeout(
          () =>
            setGameOver((prev) => {
              return { ...prev, gameOver: true, success: true };
            }),
          [2000]
        );
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

  // Delete letter
  const deleteLetter = () => {
    if (letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[attemptValue][letterPosition - 1] = "";
    setBoard(newBoard);
    setLetterPosition((prev) => prev - 1);
  };

  // Get new word from the data base
  const getNewWord = async () => {
    generateWordsSet().then(({ wordSet, todaysWord }) => {
      setWordsSet(wordSet);
      setChosenWord(todaysWord);
    });
  };

  useEffect(() => {
    getNewWord();
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
            getNewWord,
            gameOver,
            setAttemptValue,
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
