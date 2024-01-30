import { Puzzle, Clue } from "../interfaces";

export default function ClueHolder({
  puzzleHolder,
  horizontal,
}: {
  puzzleHolder: Puzzle;
  horizontal?: boolean;
}) {
  const cluesToUse = horizontal
    ? puzzleHolder.horizontalClues
    : puzzleHolder.verticalClues;
  return (
    <div className={horizontal ? "horizontalClues" : "verticalClues"}>
      {cluesToUse.map((clueSet: Clue[]) => {
        return (
          <div
            className={
              horizontal ? "horizontalClueHolder" : "verticalClueHolder"
            }
          >
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
