import { CurrentCordsObj } from "../interfaces";

export default function GameBoard({
  currentGameBoard,
  changeGameboardValue,
}: {
  currentGameBoard: number[][];
  changeGameboardValue: (currentCords: CurrentCordsObj) => void;
}) {
  return (
    <div className="gameBoard">
      {currentGameBoard.map((rowOfBoard, curCol) => {
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
  );
}
