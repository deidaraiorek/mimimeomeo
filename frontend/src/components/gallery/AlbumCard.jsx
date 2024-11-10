// AlbumCard.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const AlbumCard = ({ album, onOpen, onDelete, onRename }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRenameClick = () => {
    setShowDropdown(false);
    onRename(album.name);
  };

  return (
    <div
      onClick={() => onOpen(album.name)}
      className="p-4 bg-white rounded-lg cursor-pointer w-80 hover:shadow-lg transition-shadow duration-300 border border-pink-200 border-2"
    >
      <div className="relative h-48 w-full rounded-lg overflow-hidden bg-white flex w-80">
        <div className="w-2/3 mr-0.5">
          {album.images && album.images[0] ? (
            <img
              src={album.images[0]}
              alt="Album Cover"
              className="w-full h-full object-cover rounded-l-lg"
            />
          ) : (
            <div className="h-full bg-neutral-200 rounded-l-lg"></div>
          )}
        </div>
        <div className="w-1/3 flex flex-col">
          {album.images && album.images[1] ? (
            <img
              src={album.images[1]}
              alt="Album Image 2"
              className="h-1/2 object-cover rounded-tr-lg mb-0.5"
            />
          ) : (
            <div className="h-1/2 bg-neutral-200 mb-0.5 rounded-tr-lg"></div>
          )}
          {album.images && album.images[2] ? (
            <img
              src={album.images[2]}
              alt="Album Image 3"
              className="h-1/2 object-cover rounded-br-lg"
            />
          ) : (
            <div className="h-1/2 bg-neutral-200 rounded-br-lg"></div>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold mt-2 ml-2">{album.name}</h3>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-100 duration-500 ml-4 mt-2 pb-1"
          >
            <span className="text-lg">:</span>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRenameClick();
                }}
                className="w-full text-left px-2 py-1 hover:bg-gray-200"
              >
                Rename
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(album.name);
                }}
                className="w-full text-left px-2 py-1 hover:bg-gray-200"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
