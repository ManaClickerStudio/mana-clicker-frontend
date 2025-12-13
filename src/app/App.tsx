import React from "react";
import { AppRouter } from "./routing";
import { GlobalStyles } from "./App.styles";

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <AppRouter />
    </>
  );
};
