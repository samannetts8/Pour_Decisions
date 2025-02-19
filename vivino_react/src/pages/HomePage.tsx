import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, Upload, Wine } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <Wine size={64} className="text-wine mx-auto mb-4" />
          <h1 className="text-4xl font-cinzel text-wine">Wine Rating</h1>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="px-8 py-4 bg-gold text-wine rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-colors font-cinzel"
          >
            <Upload size={20} />
            Image Upload
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            onClick={() => navigate('/database')}
            className="px-8 py-4 bg-wine text-cream rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-colors font-cinzel"
          >
            <Database size={20} />
            Database
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;