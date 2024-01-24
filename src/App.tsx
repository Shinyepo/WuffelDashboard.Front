import React, { ComponentClass, FC } from "react";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { NoMatch } from "./pages/NoMatch";
import { Dashboard } from "./pages/Dashboard";
import { createBrowserHistory } from "history";

interface Props {
  Component?: ComponentClass;
  pageProps?: Object;
}
const history = createBrowserHistory();

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
