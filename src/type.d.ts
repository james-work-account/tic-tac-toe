type PlayerAction = "X" | "O";
type CellState = PlayerAction | null;
type Cell = {
  state: CellState;
  position?: string;
};
type BoardState = Cell[];
type FullSet = [Cell, Cell, Cell];
type Winner = CellState | "no one";

type GameState = {
  board: BoardState;
  winner: Winner;
  playerToMove: PlayerAction;
};

type GameAction = {
  type: string;
  positionInBoard: number;
};

type DispatchType = (args: GameAction) => GameAction;
