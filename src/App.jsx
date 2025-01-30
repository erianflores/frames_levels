import React from "react";
import { SignupPage } from "./pages/SignupPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <h1>Frames & Levels</h1>
        <Routes>
          <Route path="/" element={<SignupPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
