import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, Filter, ChevronLeft, ChevronRight, Wine } from 'lucide-react';

const DatabasePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const mockData = Array.from({ length: 10 }, (_, i) => ({
    score: Math.random() * 100,
    brand: `Château ${i + 1}`,
    vineyard: `Estate ${i + 1}`,
    year: 2020 + i,
    value: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 1000)
  }));

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-wine shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Wine className="h-8 w-8 text-cream" />
            <nav className="flex gap-6">
              <Link to="/" className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors font-cinzel">
                <Home size={20} />
                Home
              </Link>
              <Link to="/upload" className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors font-cinzel">
                <Search size={20} />
                Image Upload
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-72 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-cinzel mb-6 text-wine flex items-center gap-2">
              <Filter size={20} />
              Filters
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-cinzel text-wine/80 mb-2">Brand</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-xl border border-gold/50 focus:border-wine focus:ring-1 focus:ring-wine bg-cream/50"
                />
              </div>
              <div>
                <label className="block text-sm font-cinzel text-wine/80 mb-2">Year Range</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-xl border border-gold/50 focus:border-wine focus:ring-1 focus:ring-wine bg-cream/50"
                />
              </div>
              <div>
                <label className="block text-sm font-cinzel text-wine/80 mb-2">Price Range</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-xl border border-gold/50 focus:border-wine focus:ring-1 focus:ring-wine bg-cream/50"
                />
              </div>
              <button className="w-full bg-wine text-cream rounded-xl py-3 hover:bg-wine/90 transition-colors font-cinzel mt-6">
                Apply Filters
              </button>
            </div>
          </motion.div>

          {/* Results Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gold/30">
                  <thead className="bg-wine/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider">Brand</th>
                      <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider">Vineyard</th>
                      <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider">Year</th>
                      <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/30">
                    {mockData.map((item, index) => (
                      <tr key={index} className="hover:bg-wine/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-cinzel ${
                            item.score >= 80 
                              ? 'bg-wine/10 text-wine' 
                              : 'bg-gold/10 text-gold'
                          }`}>
                            {Math.round(item.score)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-cinzel text-wine">{item.brand}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-cinzel text-wine/80">{item.vineyard}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-cinzel text-wine/80">{item.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-cinzel text-wine/80">{item.value}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-cinzel text-wine/80">${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-wine/5 px-6 py-4 flex items-center justify-between border-t border-gold/30">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="inline-flex items-center px-3 py-2 rounded-xl bg-cream text-wine font-cinzel text-sm hover:bg-gold/20 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-wine font-cinzel">Page {currentPage}</span>
                  <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="inline-flex items-center px-3 py-2 rounded-xl bg-cream text-wine font-cinzel text-sm hover:bg-gold/20 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;