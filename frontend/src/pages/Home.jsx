import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';   // <-- Import navigation hook
import { NoteContext } from '../context/NoteContext';
import Notecard from '../components/Notecard';

function Home() {
  const { notes, loading } = useContext(NoteContext);
  const navigate = useNavigate();  // <-- Initialize navigation

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <p className="text-2xl font-semibold text-blue-600 animate-pulse">
          Loading notes...
        </p>
      </div>
    );
  }

  // Empty state
  if (notes.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <p className="text-2xl text-gray-700 font-medium">
          No notes available. Start creating one! 📝
        </p>
        {/* Button redirects to /create */}
        <button
          onClick={() => navigate('/create')}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md"
        >
          Create Note
        </button>
      </div>
    );
  }

  // Display notes
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Your Notes
        </h1>
        {/* Add create button on top as well */}
        <button
          onClick={() => navigate('/create')}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
        >
          + Create Note
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note) => (
          <Notecard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default Home;
