import React, { useState } from "react";
import "./styles/App.scss";

type PlayerAction = "X" | "O";
type CellState = PlayerAction | null;
type Board = CellState[];
type FullSet = [CellState, CellState, CellState];
type Winner = CellState | "no one";

const initialBoard: Board = [null, null, null, null, null, null, null, null, null];

const winningStates: FullSet[] = [
  ["X", "X", "X"],
  ["O", "O", "O"],
];

function compare<T>(expected: [T, T, T], actual: [T, T, T]): boolean {
  return expected[0] === actual[0] && expected[1] === actual[1] && expected[2] === actual[2];
}

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [playerToMove, setPlayerToMove] = useState<PlayerAction>("X");
  const [winner, setWinner] = useState<Winner>(null);

  function checkIfGameIsOver(newBoard: Board): boolean {
    const [b0, b1, b2, b3, b4, b5, b6, b7, b8]: Board = newBoard;
    // check columns
    const columns: FullSet[] = [
      [b0, b3, b6],
      [b1, b4, b7],
      [b2, b5, b8],
    ];
    // check rows
    const rows: FullSet[] = [
      [b0, b1, b2],
      [b3, b4, b5],
      [b6, b7, b8],
    ];
    // check diagonals
    const diagonals: FullSet[] = [
      [b0, b4, b8],
      [b2, b4, b6],
    ];
    for (const winningState of winningStates) {
      if (
        columns.find((col) => compare(col, winningState)) ||
        rows.find((row) => compare(row, winningState)) ||
        diagonals.find((diag) => compare(diag, winningState))
      ) {
        setWinner(playerToMove);
        return true;
      }
    }
    for (const square of newBoard) {
      if (square === null) {
        return false; // if there are any legal moves left, keep playing
      }
    }
    setWinner("no one");
    return true;
  }

  function handlePlayerMove(positionInBoard: number): void {
    const targetState: CellState = board[positionInBoard];
    if (targetState === null) {
      const newBoard: Board = board.map((square, i) =>
        i === positionInBoard ? playerToMove : square
      );
      const isGameOver = checkIfGameIsOver(newBoard);
      setBoard(newBoard);
      if (!isGameOver) setPlayerToMove(playerToMove === "X" ? "O" : "X");
    }
  }

  function handleReset(): void {
    setBoard(initialBoard);
    setPlayerToMove("X");
    setWinner(null);
  }

  const Heading: React.FC = () => {
    switch (winner) {
      case null:
        return <h1>{playerToMove} to move!</h1>;
      case "no one":
        return (
          <>
            <h1>No one wins!</h1>
            <button className='play-again' onClick={handleReset}>
              Play again?
            </button>
          </>
        );
      case "X":
      case "O":
        return (
          <>
            <h1>{playerToMove} wins!</h1>
            <button className='play-again' onClick={handleReset}>
              Play again?
            </button>
          </>
        );
    }
  };

  return (
    <>
      <div id='heading'>
        <Heading />
      </div>
      <div id='board'>
        {board.map((square, i) => (
          <div className='square' key={i}>
            <button onClick={() => handlePlayerMove(i)} disabled={winner !== null}>
              {square}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
