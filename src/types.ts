export type PlayerAction = "X" | "O";
export type CellState = PlayerAction | null;
export type Description = string;
export type Cell = {
  state: CellState;
  description?: Description;
};
export type Board = Cell[];
export type FullSet = [Cell, Cell, Cell];
export type Winner = CellState | "no one";
