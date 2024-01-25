import { useState, useEffect } from "react";
import "./App.css";

interface currentCordsObj {
  row: number;
  col: number;
}

function App() {
  // const initialGameBoard = Array(9).fill(Array(9).fill(0));
  const initialGameBoard = Array(9).fill(Array(9).fill(0));
  const [gameBoard, setGameboard] = useState(initialGameBoard);
  const [currentSelectedDigit, setDigit] = useState(0);

  //for keyboard input
  const numberSelectViaKey = ({ key }: KeyboardEvent) => {
    const lastPress = Number(key);
    // we want 1-9, no 0
    if (lastPress) {
      setDigit(lastPress);
    }
  };

  const changeGameboardValue = (currentCords: currentCordsObj) => {
    if (currentSelectedDigit) {
      const newGameBoard = [...gameBoard];
      const changedCol = [...newGameBoard[currentCords.col]];
      changedCol[currentCords.row] = currentSelectedDigit;
      newGameBoard[currentCords.col] = changedCol;

      setGameboard(newGameBoard);
    }
  };

  // const updateGrid = (numberToChange, cordnates) =>
  useEffect(() => {
    document.addEventListener("keydown", numberSelectViaKey, true);

    return () => {
      document.removeEventListener("keydown", numberSelectViaKey, true);
    };
  }, [currentSelectedDigit]);

  return (
    <>
      <div> {currentSelectedDigit}</div>

      <div className="gameBoard">
        {gameBoard.map((rowOfBoard: Array<number>, curCol) => {
          return (
            <div key={curCol}>
              {rowOfBoard.map((numberToFill: number, curRow) => {
                const currentCords = {
                  row: curRow,
                  col: curCol,
                };

                return (
                  <div
                    //there has to be a better way to do this.
                    key={curRow + "" + curCol}
                    className="gameCell"
                    onClick={() => changeGameboardValue(currentCords)}
                  >
                    {numberToFill ? numberToFill : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
