import { useState, useEffect } from "react";
import "./App.css";

interface currentCordsObj {
  row: number;
  col: number;
}

interface clue {
  number: number;
  absolute: boolean;
}

interface puzzle {
  solution: Array<Array<number>>;
  verticalClues: Array<Array<clue>>;
  horizontalClues: Array<Array<clue>>;
}

const puzzle: puzzle = {
  solution: [
    [9, 2, 6, 8, 4, 5, 7, 3, 1],
    [5, 1, 8, 6, 3, 7, 2, 4, 9],
    [7, 4, 3, 2, 9, 1, 8, 6, 5],
    [8, 3, 4, 1, 2, 6, 9, 5, 7],
    [6, 5, 1, 7, 8, 9, 4, 2, 3],
    [2, 7, 9, 3, 5, 4, 6, 1, 8],
    [3, 9, 2, 4, 1, 8, 5, 7, 6],
    [4, 6, 5, 9, 7, 3, 1, 8, 2],
    [1, 8, 7, 5, 6, 2, 3, 9, 4],
  ],
  verticalClues: [
    [
      { number: 9, absolute: true },
      { number: 16, absolute: false },
      { number: 4, absolute: true },
      { number: 16, absolute: false },
    ],
    [
      { number: 23, absolute: false },
      { number: 7, absolute: true },
      { number: 15, absolute: false },
    ],
    [
      { number: 7, absolute: true },
      { number: 18, absolute: false },
      { number: 9, absolute: false },
      { number: 11, absolute: false },
    ],
    [
      { number: 16, absolute: false },
      { number: 29, absolute: false },
    ],
    [
      { number: 12, absolute: false },
      { number: 24, absolute: false },
      { number: 9, absolute: false },
    ],
    [
      { number: 21, absolute: false },
      { number: 24, absolute: false },
    ],
    [
      { number: 12, absolute: false },
      { number: 33, absolute: false },
    ],
    [{ number: 45, absolute: false }],
    [
      { number: 16, absolute: false },
      { number: 5, absolute: true },
      { number: 8, absolute: false },
      { number: 12, absolute: false },
      { number: 4, absolute: true },
    ],
  ],
  horizontalClues: [
    [{ number: 45, absolute: false }],
    [
      { number: 10, absolute: false },
      { number: 21, absolute: false },
      { number: 14, absolute: false },
    ],
    [
      { number: 6, absolute: true },
      { number: 8, absolute: true },
      { number: 3, absolute: true },
      { number: 28, absolute: false },
    ],
    [
      { number: 27, absolute: false },
      { number: 18, absolute: false },
    ],
    [
      { number: 16, absolute: false },
      { number: 10, absolute: false },
      { number: 19, absolute: false },
    ],
    [
      { number: 5, absolute: true },
      { number: 7, absolute: true },
      { number: 33, absolute: false },
    ],
    [
      { number: 17, absolute: false },
      { number: 19, absolute: false },
      { number: 9, absolute: false },
    ],
    [
      { number: 13, absolute: false },
      { number: 5, absolute: true },
      { number: 27, absolute: false },
    ],
    [
      { number: 10, absolute: false },
      { number: 35, absolute: false },
    ],
  ],
};

function App() {
  const initialGameBoard = Array(9).fill(Array(9).fill(0));
  const [gameBoard, setGameboard] = useState(initialGameBoard);
  const [currentSelectedDigit, setDigit] = useState(0);
  const [invalidBoard, setInvalidBoard] = useState(false);
  const [winner, setWinner] = useState(false);
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
  const colCheck = (board: Array<Array<number>>) => {
    const rotatedBoard: Array<Array<number>> = [];
    let isProblem = false;
    for (let index = 0; index < board.length; index++) {
      const colArray: Array<number> = [];
      board.forEach((column) => {
        colArray.push(column[index]);
      });
      rotatedBoard.push(colArray);
    }
    rotatedBoard.forEach((element: Array<number>) => {
      const results = noDupeNumbers(element);
      if (results.length > 0) {
        isProblem = true;
      }
    });
    return isProblem;
  };
  const rowCheck = (board: Array<Array<number>>) => {
    board.forEach((element: Array<number>) => {
      const results = noDupeNumbers(element);
      if (results.length > 0) {
        console.log("bad column");
        return true;
      }
    });
    return false;
  };

  const checkForWinner = (gameBoard: Array<Array<number>>) => {
    const flattenedGameBoard: Array<number> = gameBoard.flat();
    const flattenedSolution: Array<number> = puzzle.solution.flat();
    return flattenedGameBoard.every((element: number, index: number) => {
      return element === flattenedSolution[index];
    });
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
      if (checkForWinner(newGameBoard)) {
        setWinner(true);
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
      <div className="clueHolder">
        <div className="spacer"></div>
        <div className="horizontalClues">
          {puzzle.horizontalClues.map((clueSet) => {
            return (
              <div className="horizontalClueHolder">
                {clueSet.map((clue) => {
                  return <div className="clue">{clue.number}</div>;
                })}
              </div>
            );
          })}
        </div>
        <div className="verticalClues">
          {puzzle.horizontalClues.map((clueSet) => {
            return (
              <div className="verticalClueHolder">
                {clueSet.map((clue) => {
                  return <div className="clue">{clue.number}</div>;
                })}
              </div>
            );
          })}
        </div>
        <div className="gameBoard">
          {gameBoard.map((rowOfBoard, curCol) => {
            return rowOfBoard.map((numberToFill: number, curRow: number) => {
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
            });
          })}
        </div>

        <div id="warningMessage">
          {invalidBoard ? "Dupe Somewhere     " : "All Numbers Valid       "}
        </div>

        <div className="gameBoard ">
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
        <div>{winner ? "You solved it!" : ""}</div>
      </div>
    </>
  );
}

export default App;
