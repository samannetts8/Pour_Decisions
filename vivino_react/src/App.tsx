import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ImageUpload from './pages/ImageUpload';
import DatabasePage from './pages/DatabasePage';
import './index.css';

function App() {
  const [wineData, setWineData] = useState([]);  

  useEffect(() => {
    async function data_import() {
      try {
        // const response = await fetch("http://13.49.80.112:5000/");
        const response = await fetch("http://127.0.0.1:5000");
        const data = await response.json();
        setWineData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    data_import();
  }, []);




  return (
    <Router>
      <Routes>
      <Route path="/upload" element={<ImageUpload wineData={wineData} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/database" element={<DatabasePage wineData={wineData}  />} />
      </Routes>
    </Router>
  );
}

export default App;