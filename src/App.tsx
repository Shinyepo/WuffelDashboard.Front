import React, { ComponentClass, FC } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { NoMatch } from "./pages/NoMatch";
import { Dashboard } from "./pages/Dashboard";

interface Props {
  Component?: ComponentClass;
  pageProps?: Object;
}

const App: FC<Props> = ({ Component, pageProps }) => {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/:id?/*" element={<Dashboard />} />
        <Route element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
