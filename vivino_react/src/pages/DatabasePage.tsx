import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, Filter, ChevronLeft, ChevronRight, Gem } from 'lucide-react';

const DatabasePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data for demonstration
  const mockData = Array.from({ length: 10 }, (_, i) => ({
    score: Math.random() * 100,
    brand: `Brand ${i + 1}`,
    vineyard: `Vineyard ${i + 1}`,
    year: 2020 + i,
    value: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 1000)
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Gem className="h-8 w-8 text-blue-500" />
            <nav className="flex gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Home size={20} />
                Home
              </Link>
              <Link to="/upload" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                Image Upload
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 bg-white rounded-lg shadow-sm p-4"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Filter size={20} />
              Filters
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Year Range</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price Range</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <button className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors">
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
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vineyard</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                            item.score >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {Math.round(item.score)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.brand}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.vineyard}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.value}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="relative inline-flex items-center px-2 py-2 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-gray-700">Page {currentPage}</span>
                  <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="relative inline-flex items-center px-2 py-2 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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