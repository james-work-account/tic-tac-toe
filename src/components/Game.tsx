import { Cell, Winner } from "../types";

interface Props {
  board: Cell[];
  handlePlayerMove: (positionInBoard: number) => void;
  winner: Winner;
}
export const Game: React.FC<Props> = ({ board, winner, handlePlayerMove }) => {
  return (
    <main id="board">
      {board.map((square, i) => (
        <div className="square" key={i}>
          <button
            onClick={() => handlePlayerMove(i)}
            disabled={winner !== null}
            aria-label={
              square.description ? `Toggle position ${square.description}` : `Toggle position at array value ${i}`
            }
          >
            {square.state}
          </button>
        </div>
      ))}
    </main>
  );
};
