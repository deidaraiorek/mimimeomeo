// EditAlbumModal.jsx
import React from 'react';

const EditAlbumModal = ({ newAlbumName, setNewAlbumName, onClose, onSave }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 w-full max-w-md text-center space-y-5">
      <h3 className="text-xl font-bold text-pink-900">Rename Album</h3>
      <input
        type="text"
        placeholder="Enter new album name"
        value={newAlbumName}
        onChange={(e) => setNewAlbumName(e.target.value)}
        className="w-full p-2 rounded-md focus:outline-none"
      />
      <div className="flex justify-center space-x-4">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-pink-800 text-white font-semibold rounded-md hover:bg-pink-900"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default EditAlbumModal;
