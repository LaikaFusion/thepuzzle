export interface CurrentCordsObj {
  row: number;
  col: number;
}

export interface Clue {
  number: number;
  absolute: boolean;
}

export interface Puzzle {
  puzzleId: number;
  solution: number[][];
  verticalClues: Clue[][];
  horizontalClues: Clue[][];
}
