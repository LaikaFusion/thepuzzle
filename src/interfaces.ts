export interface CurrentCordsObj {
  row: number;
  col: number;
}

export interface Clue {
  number: number;
  absolute: boolean;
}

export interface Puzzle {
  solution: number[][];
  verticalClues: Clue[][];
  horizontalClues: Clue[][];
}
