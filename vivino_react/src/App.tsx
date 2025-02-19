import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DatabasePage from './pages/DatabasePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/database" element={<DatabasePage />} />
      </Routes>
    </Router>
  );
}

export default App;