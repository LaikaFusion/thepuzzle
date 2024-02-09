import { useState, useEffect } from "react";
import "./App.css";
import { CurrentCordsObj, Puzzle } from "./interfaces";
import GameBoard from "./puzzlepieces/GameBoard";
import NumberSelector from "./puzzlepieces/NumberSelector";
import ClueHolder from "./puzzlepieces/ClueHolder";
import puzzles from "./puzzles.json";

function App() {
  const changePuzzle = () => {
    const pickedPuzzle: Puzzle =
      puzzles[Math.floor(Math.random() * puzzles.length)];
    localStorage.setItem("curPuzzle", JSON.stringify(pickedPuzzle));
    return;
  };
  const currentPuzzle = (): Puzzle => {
    if (localStorage.getItem("curPuzzle") == null) {
      changePuzzle();
    }
    const puzzle = localStorage.getItem("curPuzzle");
    if (puzzle) {
      return JSON.parse(puzzle);
    }
    console.error("No puzzle");

    return {
      puzzleId: 0,
      solution: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      verticalClues: [
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
      ],
      horizontalClues: [
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
        [{ number: 0, absolute: true }],
      ],
    };
  };

  const initialGameBoard = Array(9).fill(Array(9).fill(0));
  const [gameBoard, setGameboard] = useState(initialGameBoard);
  const [currentSelectedDigit, setDigit] = useState(0);
  const [invalidBoard, setInvalidBoard] = useState(false);
  const [winner, setWinner] = useState(false);
  const [curPuzzle, setCurPuzzle] = useState(currentPuzzle());

  const noDupeNumbers = (row: number[]) => {
    const dupes: number[] = [];

    row.forEach((element: number, index: number) => {
      if (index !== row.lastIndexOf(element) && element !== 0) {
        dupes.push(element);
      }
    });
    //making an array here to eventually do highlighting but that's not a concern yet
    return [...new Set(dupes)];
  };

  const boxCheck = (board: number[][]) => {
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
    boxedBoard.forEach((element: number[]) => {
      const results = noDupeNumbers(element);
      if (results.length > 0) {
        isProblem = true;
      }
    });
    return isProblem;
  };
  const colCheck = (board: number[][]) => {
    const rotatedBoard: number[][] = [];
    let isProblem = false;
    for (let index = 0; index < board.length; index++) {
      const colArray: number[] = [];
      board.forEach((column) => {
        colArray.push(column[index]);
      });
      rotatedBoard.push(colArray);
    }
    rotatedBoard.forEach((element: number[]) => {
      const results = noDupeNumbers(element);
      if (results.length > 0) {
        isProblem = true;
      }
    });
    return isProblem;
  };
  const rowCheck = (board: number[][]) => {
    let isProblem = false;
    board.forEach((element: number[]) => {
      const results = noDupeNumbers(element);
      if (results.length > 0) {
        isProblem = true;
      }
    });
    return isProblem;
  };

  const checkForWinner = (gameBoard: number[][]) => {
    const flattenedGameBoard: number[] = gameBoard.flat();
    const flattenedSolutionResult = curPuzzle;
    const flattenedSolution: number[] = flattenedSolutionResult.solution.flat();
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
  const changeGameboardValue = (currentCords: CurrentCordsObj) => {
    if (currentSelectedDigit) {
      const newGameBoard = [...gameBoard];
      const changedCol = [...newGameBoard[currentCords.col]];
      changedCol[currentCords.row] =
        changedCol[currentCords.row] === currentSelectedDigit
          ? 0
          : currentSelectedDigit;
      newGameBoard[currentCords.col] = changedCol;
      localStorage.setItem("gameBoard", JSON.stringify(newGameBoard));
      // TODO: Extract this into a seperate function
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

  useEffect(() => {
    const potentialBoard = localStorage.getItem("gameBoard");
    if (potentialBoard) {
      const convertedBoard = JSON.parse(potentialBoard);
      setGameboard(convertedBoard);
      // TODO: Extract this into a seperate function

      if (
        colCheck(convertedBoard) ||
        rowCheck(convertedBoard) ||
        boxCheck(convertedBoard)
      ) {
        setInvalidBoard(true);
      } else {
        setInvalidBoard(false);
      }
    }
  }, []);

  return (
    <>
      <div className="gameArea">
        <div className="fullGameHolder">
          <div className="alertsHolder">
            <div id="alertBar" onClick={changePuzzle}>
              New Puzzle
            </div>

            <div id="alertBar">
              Mistake{" "}
              <div id={invalidBoard ? "alertLightActive" : "alertLight"} />
            </div>
            <div id="alertBar">
              Winner <div id={winner ? "alertLightActive" : "alertLight"} />
            </div>
          </div>
          <ClueHolder puzzleHolder={curPuzzle} horizontal />
          <ClueHolder puzzleHolder={curPuzzle} />
          <div className="gameTray underEffect">
            <GameBoard
              currentGameBoard={gameBoard}
              changeGameboardValue={changeGameboardValue}
            />
          </div>
          <div id="spacer" />

          <NumberSelector
            currentSelectedDigit={currentSelectedDigit}
            numberSelectViaButton={numberSelectViaButton}
          />
        </div>
      </div>
    </>
  );
}

export default App;
