import React from "react";
import  { SignupPage }  from "./pages/SignupPage";
import  HomePage  from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  "./styles/App.css";
//import "./styles/Featuredgames.css";

function App() {
  return (
    <Router>
      <>
        <h1>Frames & Levels</h1>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
