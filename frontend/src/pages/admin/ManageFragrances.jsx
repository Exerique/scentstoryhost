import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageFragrances = () => {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/fragrances')
      .then(res => setFragrances(res.data.data || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-white">Manage Fragrances</h2>
        <button className="bg-accent text-white px-4 py-2 rounded">Add Fragrance</button>
      </div>
      
      {loading ? <p>Loading...</p> : (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Archetype</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {fragrances.map(f => (
                <tr key={f._id} className="border-t border-gray-800">
                  <td className="p-4 font-medium">{f.name}</td>
                  <td className="p-4">{f.category}</td>
                  <td className="p-4">{f.archetype}</td>
                  <td className="p-4"><button className="text-accent underline">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageFragrances;
