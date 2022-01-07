import * as actionTypes from "./actionTypes";

export function playerMove(positionInBoard: number) {
  const action: GameAction = {
    type: actionTypes.PLAYER_MOVE,
    positionInBoard,
  };

  return dispatchAction(action);
}

export function resetGame() {
  const action: GameAction = {
    type: actionTypes.RESET_GAME,
    positionInBoard: 0, // not used so doesn't matter
  };

  return dispatchAction(action);
}

export function dispatchAction(action: GameAction) {
  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}
