import { Puzzle, Clue } from "../interfaces";

export default function VerticalClueHolder({
  puzzleHolder,
}: {
  puzzleHolder: Puzzle;
}) {
  return (
    <div className="verticalClues">
      {puzzleHolder.verticalClues.map((clueSet: Clue[]) => {
        return (
          <div className="verticalClueHolder">
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
