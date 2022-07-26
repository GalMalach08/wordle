import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AppContext } from "../App";
import { Fireworks } from "fireworks/lib/react";

const GameOver = () => {
  const [show, setShow] = useState(true);
  const {
    gameOver,
    chosenWord,
    attemptVal,
    setGameOver,
    getNewWord,
    setBoard,
    setAttemptValue,
    setDisabledLetters,
  } = useContext(AppContext);

  const handleClose = () => {
    setBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setAttemptValue(0);
    setDisabledLetters([]);
    setGameOver({ gameOver: false, success: false });
    setShow(false);
    getNewWord();
  };

  let fxProps = {
    count: 4,
    interval: 100,
    colors: ["#cc3333", "#4CAF50", "#81C784"],
    calc: (props, i) => ({
      ...props,
      x: (i + 1) * (window.innerWidth / 3) - (i + 4) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0),
    }),
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ color: "black", textAlign: "center" }}
      >
        <Modal.Header>
          <Modal.Title style={{ margin: "auto" }}>
            <p> {gameOver.success ? "Good job" : "You Failed"}</p>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <p>The word is {chosenWord}</p>{" "}
            {gameOver.success && <h3>You guessed in {attemptVal} guesses</h3>}
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {gameOver.success && <Fireworks {...fxProps} />}
    </>
  );
};

export default GameOver;
