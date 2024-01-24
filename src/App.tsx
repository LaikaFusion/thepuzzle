import { useState } from "react";
import "./App.css";

function App() {
  const initialGameBoard = Array(9).fill(Array(9).fill(0));
  const [gameBoard, setGameboard] = useState(initialGameBoard);

  return (
    <>
      <div className="gameBoard">
        {gameBoard.map((row) => {
          return (
            <div>
              {row.map((numberToFill: number) => {
                return <div className="gameCell">{numberToFill}</div>;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
