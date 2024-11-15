import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import API_ROUTES from "../../../constants/apiRoutes";
import ImageGrid from "../../../components/gallery/ImageGrid";
import ImageUploader from "../../../components/gallery/ImageUploader";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

const Album = () => {
  const { albumName } = useParams();
  const location = useLocation();
  const coupleId = location.state?.coupleId;
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          API_ROUTES.SHOW_IMAGES(coupleId, albumName)
        );
        if (response.data && Array.isArray(response.data)) {
          const imageUrls = response.data.map((item) => item.url);
          setImages(imageUrls);

          setTimeout(() => {
            GLightbox({ selector: ".glightbox" });
          }, 0);
        } else {
          setError("Unexpected response format");
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching images:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [albumName, coupleId]);

  const addImageToState = (newImageUrl) => {
    setImages((prevImages) => [...prevImages, newImageUrl]);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const handleDeleteImage = async (imageName) => {
    try {
      const response = await axios.delete(
        API_ROUTES.DELETE_IMAGE(coupleId, albumName, imageName)
      );
      if (response.status === 204) {
        setImages((prevImages) =>
          prevImages.filter((url) => !url.includes(imageName))
        );
      } else {
        console.error("Failed to delete the image");
      }
    } catch (error) {
      console.error(
        "Error deleting image:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="px-4 py-6">
      <p className="text-4xl font-semibold mb-6 text-pink-900 text-center">
        {albumName}
      </p>
      <ImageUploader
        albumName={albumName}
        coupleId={coupleId}
        onUploadSuccess={addImageToState}
      />
      {error ? (
        <div className="text-red-500 text-center mt-4">
          Error loading images: {error}
        </div>
      ) : (
        <ImageGrid
          images={images}
          onImageClick={openLightbox}
          onDeleteImage={handleDeleteImage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Album;
