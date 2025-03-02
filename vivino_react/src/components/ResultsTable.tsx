import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


export default function ResultsTable({ analysisResult, wineData,searchField}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedWines, setDisplayedWines] = useState([]);
  
  function page_navigation(direction: number) {
    setCurrentPage(Math.max(1, currentPage + direction));
  }
  useEffect(() => {
    async function printed_wine() {
        console.log(analysisResult)
      const temp_wine_list = [...wineData];
      console.log(searchField)
      if (searchField === "vineyard") {
        console.log("test")
        const filtered_list = temp_wine_list
        .filter((wine) => analysisResult.some(scanned_wine => wine.vineyard.toLowerCase().includes(scanned_wine.toLowerCase())));
        setDisplayedWines(filtered_list.splice(currentPage * 10 - 10, 10));
      } else if (searchField === "brand") {
        const filtered_list = temp_wine_list
        .filter((wine) => analysisResult.some(scanned_wine => wine.brand.toLowerCase().includes(scanned_wine.toLowerCase())))
        setDisplayedWines(filtered_list.splice(currentPage * 10 - 10, 10));
      } else {
        const filtered_list = temp_wine_list
        .filter((wine) => analysisResult.some(scanned_wine => wine.vineyard.toLowerCase().includes(scanned_wine.toLowerCase())) || analysisResult.some(scanned_wine => wine.brand.toLowerCase().includes(scanned_wine.toLowerCase())))
        setDisplayedWines(filtered_list.splice(currentPage * 10 - 10, 10));
      }
    }
    printed_wine()
    console.log(displayedWines)
  }, [currentPage,analysisResult,wineData,searchField]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className=" divide-y divide-gold/30">
              <thead className="bg-wine/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider w-1/12">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider w-2/12">
                    Brand
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider w-2/12">
                    Vineyard
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider text-center w-1/12 ">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider text-center w-1/12">
                    Value
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-cinzel text-wine/80 uppercase tracking-wider text-center w-1/12">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/30">
                {displayedWines.map((wine) => (
                  <tr
                    key={wine.id}
                    className="hover:bg-wine/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-cinzel ${
                          wine.average_rating >= 4.4
                            ? "bg-wine/10 text-wine"
                            : "bg-gold/10 text-gold"
                        }`}
                      >
                        {wine.average_rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-normal font-cinzel text-wine">
                      {wine.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-normal font-cinzel text-wine/80">
                      {wine.vineyard}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-cinzel text-center text-wine/80">
                      {wine.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-cinzel text-center text-wine/80">
                      {wine.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-cinzel text-center text-wine/80">
                      £{wine.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-wine/5 px-6 py-4 flex items-center justify-between border-t border-gold/30">
            <div className="flex items-center gap-4">
              <button
                onClick={() => page_navigation(-1)}
                className="inline-flex items-center px-3 py-2 rounded-xl bg-cream text-wine font-cinzel text-sm hover:bg-gold/20 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-wine font-cinzel">Page {currentPage}</span>
              <button
                onClick={() => page_navigation(1)}
                className="inline-flex items-center px-3 py-2 rounded-xl bg-cream text-wine font-cinzel text-sm hover:bg-gold/20 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
