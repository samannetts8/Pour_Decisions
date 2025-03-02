import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Database } from "lucide-react";
import Logo from "../../../static/assets/pour_decisions_logo_no_background.png";
import UploadArea from "../components/UploadArea"

export const analysisResultContext = React.createContext();

export default function ImageUpload({wineData}) {    
  const [analysisResult, setAnalysisResult] = useState(null);
  const [searchField, setSearchField] = useState('')

  return (
    <div className="h-screen bg-cream">
      <header className="bg-wine shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex-shrink-0">
                <img
                  src={Logo}
                  alt="Pour Decisions Logo"
                  className="h-24 w-auto"
                />
              </Link>
              <nav className="flex gap-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors font-cinzel text-lg"
                >
                  <Home className="h-6 w-6" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/database"
                  className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors font-cinzel text-lg"
                >
                  <Database className="h-6 w-6" />
                  <span>Database</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h1 className="text-3xl font-cinzel text-wine mb-6 text-center">
             <strong> Image Upload</strong>
            </h1>
            <analysisResultContext.Provider value={[analysisResult, setAnalysisResult]}>
              <UploadArea wineData={wineData} />
            </analysisResultContext.Provider>

          </div>
        </motion.div>
      </main>
    </div>
  );
}