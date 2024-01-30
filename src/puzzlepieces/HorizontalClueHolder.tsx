import { Puzzle, Clue } from "../interfaces";

export default function HorizontalClueHolder({
  puzzleHolder,
}: {
  puzzleHolder: Puzzle;
}) {
  return (
    <div className="horizontalClues">
      {puzzleHolder.horizontalClues.map((clueSet: Clue[]) => {
        return (
          <div className="horizontalClueHolder">
            {clueSet.map((clue) => {
              return (
                <div className={clue.absolute ? "absoluteClue clue" : "clue"}>
                  {clue.number}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
//TODO proptypes
