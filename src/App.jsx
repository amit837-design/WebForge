import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TheMainPage from "./components/TheMainPage.jsx";
import { PortfolioBuilderProvider } from "./components/PortfolioBuilderContext.jsx";
import EditorPage from "./components/EditorPage.jsx";

const App = () => {
  return (
    <PortfolioBuilderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TheMainPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </Router>
    </PortfolioBuilderProvider>
  );
};

export default App;
