import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => setQuestions(res.data.data || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-white">Manage Questions</h2>
        <button className="bg-accent text-white px-4 py-2 rounded">Add Question</button>
      </div>
      
      {loading ? <p>Loading...</p> : (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Story Title</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {questions.map(q => (
                <tr key={q._id} className="border-t border-gray-800">
                  <td className="p-4">{q.order}</td>
                  <td className="p-4">{q.storyTitle}</td>
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

export default ManageQuestions;
