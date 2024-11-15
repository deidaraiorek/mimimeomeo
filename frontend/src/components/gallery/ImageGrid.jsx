import React, { useEffect, useState } from "react";

const ImageGridSkeleton = () => {
  return (
    <div className="columns-2 md:columns-4 gap-4 mt-6 space-y-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="relative break-inside-avoid mb-4">
          <div className="w-full aspect-square rounded-lg bg-gray-200 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

const ImageGrid = ({ images, onImageClick, onDeleteImage, isLoading }) => {
  if (isLoading) {
    return <ImageGridSkeleton />;
  }

  return (
    <div className="columns-2 md:columns-4 gap-4 mt-6 space-y-4">
      {images.map((imageUrl, index) => {
        const imageName = imageUrl.split("/").pop();

        return (
          <div key={imageName} className="relative break-inside-avoid mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteImage(imageName);
              }}
              className="absolute top-2 right-2 w-6 h-6 pb-1 text-black rounded-full flex items-center justify-center bg-transparent hover:bg-gray-200 hover:text-black transition duration-200 ease-in-out"
            >
              x
            </button>
            <a href={imageUrl} className="glightbox" data-gallery="gallery">
              <img
                className="w-full h-auto rounded-lg object-cover hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                src={imageUrl}
                alt={imageName}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
