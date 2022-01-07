import { useCallback } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { resetGame } from "../store/actionCreators";

export const Header: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const { winner, playerToMove } = useSelector((state: GameState) => state, shallowEqual);

  const handleReset = useCallback(() => dispatch(resetGame()), [dispatch]);

  let h1Text: string;
  let buttonText: "Reset game" | "Play again?";
  switch (winner) {
    case null:
      h1Text = `${playerToMove} to move!`;
      buttonText = "Reset game";
      break;
    case "no one":
      h1Text = "No one wins!";
      buttonText = "Play again?";
      break;
    case "X":
    case "O":
      h1Text = `${playerToMove} wins!`;
      buttonText = "Play again?";
  }
  return (
    <header id="heading">
      <h1>{h1Text}</h1>
      <button onClick={handleReset}>{buttonText}</button>
    </header>
  );
};
