import React from "react";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import "./styles/App.scss";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Game />
    </>
  );
};

export default App;
