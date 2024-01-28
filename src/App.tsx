import { useState, useEffect } from "react";
import "./App.css";
import { element } from "prop-types";

interface currentCordsObj {
  row: number;
  col: number;
}

function App() {
  // note the gameboard is an array of columns, not of rows
  const initialGameBoard = Array(9).fill(Array(9).fill(0));
  const [gameBoard, setGameboard] = useState(initialGameBoard);
  const [currentSelectedDigit, setDigit] = useState(0);
  const [invalidBoard, setInvalidBoard] = useState(false);
  const numberSelectors = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const noDupeNumbers = (row: Array<number>) => {
    const dupes: number[] = [];

    row.forEach((element: number, index: number) => {
      if (index !== row.lastIndexOf(element) && element !== 0) {
        dupes.push(element);
      }
    });
    //making an array here to eventually do highlighting but that's not a concern yet
    return [...new Set(dupes)];
  };

  const boxCheck = (board: Array<Array<number>>) => {
    //it was late and I didn't feel like debugging nested loops
    const rowOne = [
      board[0][0],
      board[0][1],
      board[0][2],
      board[1][0],
      board[1][1],
      board[1][2],
      board[2][0],
      board[2][1],
      board[2][2],
    ];
    const rowTwo = [
      board[0][3],
      board[0][4],
      board[0][5],
      board[1][3],
      board[1][4],
      board[1][5],
      board[2][3],
      board[2][4],
      board[2][5],
    ];
    const rowThree = [
      board[0][6],
      board[0][7],
      board[0][8],
      board[1][6],
      board[1][7],
      board[1][8],
      board[2][6],
      board[2][7],
      board[2][8],
    ];
    const rowFour = [
      board[3][0],
      board[3][1],
      board[3][2],
      board[4][0],
      board[4][1],
      board[4][2],
      board[5][0],
      board[5][1],
      board[5][2],
    ];
    const rowFive = [
      board[3][3],
      board[3][4],
      board[3][5],
      board[4][3],
      board[4][4],
      board[4][5],
      board[5][3],
      board[5][4],
      board[5][5],
    ];
    const rowSix = [
      board[3][6],
      board[3][7],
      board[3][8],
      board[4][6],
      board[4][7],
      board[4][8],
      board[5][6],
      board[5][7],
      board[5][8],
    ];
    const rowSeven = [
      board[6][0],
      board[6][1],
      board[6][2],
      board[7][0],
      board[7][1],
      board[7][2],
      board[8][0],
      board[8][1],
      board[8][2],
    ];
    const rowEight = [
      board[6][3],
      board[6][4],
      board[6][5],
      board[7][3],
      board[7][4],
      board[7][5],
      board[8][3],
      board[8][4],
      board[8][5],
    ];
    const rowNine = [
      board[6][6],
      board[6][7],
      board[6][8],
      board[7][6],
      board[7][7],
      board[7][8],
      board[8][6],
      board[8][7],
      board[8][8],
    ];
    const boxedBoard = [
      rowOne,
      rowTwo,
      rowThree,
      rowFour,
      rowFive,
      rowSix,
      rowSeven,
      rowEight,
      rowNine,
    ];
    let isProblem = false;
    boxedBoard.forEach((element: Array<number>) => {
      const results = noDupeNumbers(element);
      if (results.length > 0) {
        isProblem = true;
      }
    });
    return isProblem;
  };
  const rowCheck = (board: Array<Array<number>>) => {
    const rotatedBoard: Array<Array<number>> = [];
    let isProblem = false;
    for (let index = 0; index < board.length; index++) {
      const rowArray: Array<number> = [];
      board.forEach((column) => {
        rowArray.push(column[index]);
      });
      rotatedBoard.push(rowArray);
    }
    rotatedBoard.forEach((element: Array<number>) => {
      const results = noDupeNumbers(element);
      if (results.length > 0) {
        isProblem = true;
      }
    });
    return isProblem;
  };
  const colCheck = (board: Array<Array<number>>) => {
    board.forEach((element: Array<number>) => {
      const results = noDupeNumbers(element);
      if (results.length > 0) {
        console.log("bad column");
        return true;
      }
    });
    return false;
  };

  //for keyboard input
  const numberSelectViaKey = ({ key }: KeyboardEvent) => {
    const lastPress = Number(key);
    // we want 1-9, no 0
    if (lastPress) {
      setDigit(lastPress);
    }
  };

  //for the selector button

  const numberSelectViaButton = (num: number) => {
    setDigit(num);
  };
  //for updating the master game value, this is gonna get big
  const changeGameboardValue = (currentCords: currentCordsObj) => {
    if (currentSelectedDigit) {
      const newGameBoard = [...gameBoard];
      const changedCol = [...newGameBoard[currentCords.col]];
      changedCol[currentCords.row] = currentSelectedDigit;
      newGameBoard[currentCords.col] = changedCol;

      if (
        colCheck(newGameBoard) ||
        rowCheck(newGameBoard) ||
        boxCheck(newGameBoard)
      ) {
        setInvalidBoard(true);
      } else {
        setInvalidBoard(false);
      }
      setGameboard(newGameBoard);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", numberSelectViaKey, true);

    return () => {
      document.removeEventListener("keydown", numberSelectViaKey, true);
    };
  }, [currentSelectedDigit]);

  return (
    <>
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
        <div>{invalidBoard ? "Dupe Somewhere" : "All Numbers Valid"}</div>
      </div>

      <div className="gameBoard">
        {numberSelectors.map((num) => {
          return (
            <div
              className={
                num === currentSelectedDigit
                  ? "gameCell cellSelector currentlySelected"
                  : "gameCell cellSelector"
              }
              key={num}
              onClick={() => {
                numberSelectViaButton(num);
              }}
            >
              {num}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
