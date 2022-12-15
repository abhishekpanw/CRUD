import React from "react";
import "./App.css";
import { Home } from "./Pages/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
