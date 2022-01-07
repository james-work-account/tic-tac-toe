import React, { useState } from "react";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import "./styles/App.scss";
import { Board, Cell, FullSet, PlayerAction, Winner } from "./types";

const initialBoard: Board = [
  { state: null, description: "A1" },
  { state: null, description: "A2" },
  { state: null, description: "A3" },
  { state: null, description: "B1" },
  { state: null, description: "B2" },
  { state: null, description: "B3" },
  { state: null, description: "C1" },
  { state: null, description: "C2" },
  { state: null, description: "C3" },
];

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
      if (square.state === null) {
        return false; // if there are any legal moves left, keep playing
      }
    }
    setWinner("no one");
    return true;
  }

  function handlePlayerMove(positionInBoard: number): void {
    const targetState = board[positionInBoard]?.state;
    if (targetState === null) {
      const newBoard: Board = board.map((square, i) =>
        i === positionInBoard ? { state: playerToMove, description: square.description } : square
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

  return (
    <>
      <Header winner={winner} playerToMove={playerToMove} handleReset={handleReset} />
      <Game board={board} winner={winner} handlePlayerMove={handlePlayerMove} />
    </>
  );
};

export default App;
