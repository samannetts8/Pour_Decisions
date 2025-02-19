import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, Upload, Gem } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <Gem size={64} className="text-blue-400" />
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Upload size={20} />
          Image Upload
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          onClick={() => navigate('/database')}
          className="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
        >
          <Database size={20} />
          Database
        </motion.button>
      </div>
    </div>
  );
};

export default HomePage;