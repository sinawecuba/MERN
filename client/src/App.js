import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvoiceDetails from "./pages/InvoiceDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Invoice Generator</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;