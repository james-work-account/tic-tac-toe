import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { playerMove } from "../store/actionCreators";

export const Game: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const { winner, board } = useSelector((state: GameState) => state, shallowEqual);

  const handlePlayerMove = useCallback((positionInBoard: number) => dispatch(playerMove(positionInBoard)), [dispatch]);

  return (
    <main id="board">
      {board.map((square, i) => (
        <div className="square" key={i}>
          <button
            onClick={() => handlePlayerMove(i)}
            disabled={winner !== null}
            aria-label={square.position ? `Toggle position ${square.position}` : `Toggle position at array value ${i}`}
          >
            {square.state}
          </button>
        </div>
      ))}
    </main>
  );
};
