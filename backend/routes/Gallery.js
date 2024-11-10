const express = require('express');
const {getAlbum, getImages, createAlbum, uploadImage, deleteAlbum, deleteImage, changeAlbumName} = require('../controllers/galleryController')
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const GalleryRouter = express.Router();

GalleryRouter.get('/:coupleId', getAlbum);
GalleryRouter.get('/album/:coupleId/:albumName', getImages);
GalleryRouter.post('/', createAlbum);
GalleryRouter.post('/album/upload', upload.single("image"), uploadImage);
GalleryRouter.delete('/:coupleId/:albumName', deleteAlbum);
GalleryRouter.delete('/:coupleId/:albumName/:imageName', deleteImage)
GalleryRouter.patch('/album/changename', changeAlbumName);


module.exports = GalleryRouter;