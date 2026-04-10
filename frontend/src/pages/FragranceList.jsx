import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const FragranceList = () => {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/fragrances')
      .then(res => {
        setFragrances(res.data.data || res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-20 text-center font-serif text-2xl">Breathing in library...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 w-full">
      <div className="mb-16 text-center">
        <h1 className="text-5xl mb-4">Scent Library</h1>
        <p className="text-gray-400 font-light max-w-2xl mx-auto">
          Explore our curated collection of fragrances, categorized by their distinct aromatic families.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fragrances.map((frag, idx) => (
          <motion.div
            key={frag._id || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800"
          >
            <div className="h-64 bg-black/40 overflow-hidden">
              {frag.photoUrl ? (
                <img src={frag.photoUrl} alt={frag.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">No Image</div>
              )}
            </div>
            <div className="p-6">
              <span className="text-accent text-xs uppercase tracking-widest mb-2 block">{frag.category}</span>
              <h3 className="text-2xl text-white font-serif mb-2">{frag.name}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4 font-light">{frag.description}</p>
              <div className="flex flex-wrap gap-2">
                {frag.notes?.slice(0, 3).map((note, i) => (
                  <span key={i} className="text-[10px] uppercase border border-gray-700 px-2 py-1 rounded text-gray-400">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FragranceList;
