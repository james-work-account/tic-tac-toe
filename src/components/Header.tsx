import { PlayerAction, Winner } from "../types";

interface Props {
  winner: Winner;
  playerToMove: PlayerAction;
  handleReset: () => void;
}
export const Header: React.FC<Props> = ({ winner, playerToMove, handleReset }) => {
  let h1: JSX.Element;
  let buttonText: "Reset game" | "Play again?";
  switch (winner) {
    case null:
      h1 = <h1>{playerToMove} to move!</h1>;
      buttonText = "Reset game";
      break;
    case "no one":
      h1 = <h1>No one wins!</h1>;
      buttonText = "Play again?";
      break;
    case "X":
    case "O":
      h1 = <h1>{playerToMove} wins!</h1>;
      buttonText = "Play again?";
  }
  return (
    <header id="heading">
      {h1}
      <button onClick={handleReset}>{buttonText}</button>
    </header>
  );
};
