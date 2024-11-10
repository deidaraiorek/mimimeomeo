// LightboxViewer.jsx
import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const LightboxViewer = ({ images, currentIndex, onClose, setCurrentIndex }) => {
  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `Image-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Lightbox
      mainSrc={images[currentIndex]}
      nextSrc={images[(currentIndex + 1) % images.length]}
      prevSrc={images[(currentIndex + images.length - 1) % images.length]}
      onCloseRequest={onClose}
      onMovePrevRequest={() =>
        setCurrentIndex((currentIndex + images.length - 1) % images.length)
      }
      onMoveNextRequest={() =>
        setCurrentIndex((currentIndex + 1) % images.length)
      }
      toolbarButtons={[
        <button onClick={() => downloadImage(images[currentIndex])}>Download</button>,
      ]}
    />
  );
};

export default LightboxViewer;
