import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCheckStatus from '../../../components/CheckStatus';
import axios from 'axios';
import API_ROUTES from '../../../constants/apiRoutes';
import { Toaster, toast } from 'react-hot-toast';
import { AddIcon } from '../../../assets/icon';
import AlbumCard from '../../../components/gallery/AlbumCard';
import CreateAlbumModal from '../../../components/gallery/CreateAlbumModal';
import EditAlbumModal from '../../../components/gallery/EditAlbumModal';
import gallerybg from '../../../assets/images/gallerybg.jpg';

const Gallery = () => {
  const { coupleId } = useCheckStatus();
  const [albums, setAlbums] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [newAlbumName, setNewAlbumName] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const response = await axios.get(API_ROUTES.SHOW_ALBUMS(coupleId));
        setAlbums(response.data || []);
      } catch (error) {
        console.error("Error fetching albums:", error.message);
      }
    };
    getAlbums();
  }, [coupleId]);

  const addAlbum = (newAlbum) => setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);

  const deleteAlbum = async (albumName) => {
    try {
      await axios.delete(API_ROUTES.DELETE_ALBUM(coupleId, albumName));
      setAlbums((prevAlbums) => prevAlbums.filter(album => album.name !== albumName));
    } catch (error) {
      console.error("Error deleting album:", error.message);
    }
  };

  const handleCreate = async () => {
    if (!albumName) {
      toast.error("Please enter the album name.", { duration: 2000 });
      return;
    }

    try {
      const response = await axios.post(API_ROUTES.CREATE_ALBUMS, { albumName, coupleId });
      addAlbum(response.data);
      setShowCreateModal(false);
      setAlbumName("");
    } catch (error) {
      toast.error(error.response?.data || "An error occurred", { duration: 2000 });
    }
  };

  const changeAlbumName = async (albumName) => {
    if (!newAlbumName) {
      toast.error("Please enter a new album name.", { duration: 2000 });
      return;
    }

    try {
      await axios.patch(API_ROUTES.CHANGE_ALBUM_NAME, { albumName, newAlbumName, coupleId });
      setAlbums((prevAlbums) =>
        prevAlbums.map((album) => album.name === albumName ? { ...album, name: newAlbumName } : album)
      );
      setShowEditModal(false);
      setNewAlbumName("");
    } catch (error) {
      toast.error(error.response?.data || "Error updating album name.", { duration: 2000 });
    }
  };

  return (
    <div 
    className="p-6 min-h-screen flex flex-col items-center"
    style={{
      backgroundImage: `url(${gallerybg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Toaster position="top-left" reverseOrder={false} />
      <button onClick={() => setShowCreateModal(true)} className="absolute top-17 right-10 flex items-center px-2 py-2 rounded-full bg-pink-400 hover:bg-pink-500 text-white">
        {AddIcon}
      </button>
      <div className="mt-14 flex justify-center items-center">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album) => (
            <AlbumCard
              key={album.name}
              album={album}
              onOpen={(name) => {
                navigate(`/album/${name}`, { state: { coupleId } });
              }}
              onRename={(name) => {
                setSelectedAlbum(name);
                setShowEditModal(true);
              }}
              onDelete={deleteAlbum}
            />
          ))}
        </div>
      </div>
      {showCreateModal && (
        <CreateAlbumModal
          albumName={albumName}
          setAlbumName={setAlbumName}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}
      {showEditModal && (
        <EditAlbumModal
          newAlbumName={newAlbumName}
          setNewAlbumName={setNewAlbumName}
          onClose={() => setShowEditModal(false)}
          onSave={() => changeAlbumName(selectedAlbum)
        }
        />
      )}
    </div>
  );
};

export default Gallery;
