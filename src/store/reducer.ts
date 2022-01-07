import * as actionTypes from "./actionTypes";

const initialBoard: GameState = {
  board: [
    { state: null, position: "A1" },
    { state: null, position: "A2" },
    { state: null, position: "A3" },
    { state: null, position: "B1" },
    { state: null, position: "B2" },
    { state: null, position: "B3" },
    { state: null, position: "C1" },
    { state: null, position: "C2" },
    { state: null, position: "C3" },
  ],
  winner: null,
  playerToMove: "X",
};

const winningStates: FullSet[] = [
  [{ state: "X" }, { state: "X" }, { state: "X" }],
  [{ state: "O" }, { state: "O" }, { state: "O" }],
];

function compare(expected: [Cell, Cell, Cell], actual: [Cell, Cell, Cell]): boolean {
  return (
    expected[0].state === actual[0].state &&
    expected[1].state === actual[1].state &&
    expected[2].state === actual[2].state
  );
}

const reducer = (state: GameState = initialBoard, action: GameAction): GameState => {
  switch (action.type) {
    case actionTypes.RESET_GAME: {
      // reset the game to its initial value
      return initialBoard;
    }

    case actionTypes.PLAYER_MOVE: {
      // player has clicked on a square
      const { board, playerToMove } = state;
      const positionInBoard = action.positionInBoard;
      const targetSquare = board[positionInBoard]?.state;

      if (targetSquare === null) {
        // target square is not occupied

        // Update board with target square filled in
        const newBoard: BoardState = board.map((square, i) =>
          i === positionInBoard ? { state: playerToMove, position: square.position } : square
        );

        // separate out columns, rows and diagonals
        const [a1, a2, a3, b1, b2, b3, c1, c2, c3]: BoardState = newBoard;
        const columns: FullSet[] = [
          [a1, b1, c1],
          [a2, b2, c2],
          [a3, b3, c3],
        ];
        const rows: FullSet[] = [
          [a1, a2, a3],
          [b1, b2, b3],
          [c1, c2, c3],
        ];
        const diagonals: FullSet[] = [
          [a1, b2, c3],
          [a3, b2, c1],
        ];

        // Check for a winner
        for (const winningState of winningStates) {
          if (
            columns.find((col) => compare(col, winningState)) ||
            rows.find((row) => compare(row, winningState)) ||
            diagonals.find((diag) => compare(diag, winningState))
          ) {
            // there's a three-in-a-row match so the game is over
            return {
              ...state,
              board: newBoard,
              winner: playerToMove,
            };
          }
        }

        // Check if any squares are still available
        for (const square of newBoard) {
          if (square.state === null) {
            // if there are any legal moves left, keep playing
            return {
              ...state,
              board: newBoard,
              playerToMove: playerToMove === "X" ? "O" : "X",
            };
          }
        }

        // No winner, no squares available
        return {
          ...state,
          board: newBoard,
          winner: "no one",
        };
      } else {
        // targetState is not null, ie there's already something at that position
        // or targetState is undefined (shouldn't happen)
        return state;
      }
    }

    default:
      // unknown action
      return state;
  }
};

export default reducer;
