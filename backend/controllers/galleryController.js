const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const supabase = require('./supabaseClient');

const getAlbum = async (req, res) => {
    try {
        const { coupleId } = req.params;

        // Fetch albums for the couple
        const albums = await prisma.album.findMany({
            where: { coupleId: parseInt(coupleId) },
            orderBy: { createdAt: 'desc' }
        });

        // For each album, fetch the first 3 images from Supabase
        const albumsWithImages = await Promise.all(albums.map(async (album) => {
            const folderName = `${coupleId}/${album.name}`;

            // Fetch the first three images in this album folder
            const { data, error } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .list(folderName, { limit: 3, sortBy: { column: 'created_at', order: 'desc' } });

            if (error) {
                console.error(`Error retrieving images for album ${album.id}:`, error);
                return { ...album, images: [] };
            }

            // Generate public URLs for each image
            const images = data.map((file) => {
                const filePath = `${folderName}/${file.name}`;
                return `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${filePath}`;
            });

            return { ...album, images };
        }));

        res.json(albumsWithImages);
    } catch (error) {
        console.error('Error retrieving couple albums:', error);
        res.status(500).json({ error: 'Failed to retrieve couple albums' });
    }
};


// Fetch images from a specific album for a couple
const getImages = async (req, res) => {
    try {
        const { coupleId, albumName } = req.params;
        const folderName = `${coupleId}/${albumName}`;

        const baseURL = process.env.SUPABASE_URL;

        // Fetch images in the specified album folder
        const { data, error } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET_NAME)
            .list(folderName);
        if (error) {
            console.error('Error retrieving images from Supabase:', error);
            return res.status(500).json({ error: 'Failed to retrieve images' });
        }

        // Construct public URLs for each image
        const images = data.map((file) => {
            const filePath = `${folderName}/${file.name}`;
            const publicURL = `${baseURL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${filePath}`;
            return { url: publicURL };
        });
        res.json(images);
    } catch (error) {
        console.error('Error retrieving images:', error);
        res.status(500).json({ error: 'Failed to retrieve images' });
    }
};

// Create an album and ensure the couple's folder exists
const createAlbum = async (req, res) => {
    try {
        const { albumName, coupleId } = req.body;

        const existingAlbum = await prisma.album.findUnique({
            where: {
                name: albumName
            }
        })

        if (existingAlbum) {
            return res.status(400).json("Album name already exists")
        }

        const newAlbum = await prisma.album.create({ data: { name: albumName, coupleId } });
        const folderPath = `${coupleId}/${newAlbum.name}`;

        const { error: folderError } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET_NAME)
            .upload(`${folderPath}/.keep`, Buffer.from(""), {
                contentType: "text/plain",
            });

        if (folderError) {
            console.error("Error creating album folder:", folderError);
            return res.status(500).json({ error: "Failed to create album folder" });
        }

        res.status(201).json(newAlbum);
    } catch (error) {
        console.error("Error creating album:", error);
        res.status(500).json({ error: "An error occurred while creating the album" });
    }
};


// Upload an image to a specific album for a couple
const uploadImage = async (req, res) => {
    try {
        const { albumName, coupleId } = req.body;
        const file = req.file;

        if (!file || !albumName || !coupleId) {
            return res.status(400).json({ error: 'Image file, albumName, and coupleId are required' });
        }

        const folderPath = `${coupleId}/${albumName}`;


        // Upload image to Supabase storage in the specified folder
        const { data, error: uploadError } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET_NAME)
            .upload(`${folderPath}/${Date.now()}_${file.originalname}`, file.buffer, {
                contentType: file.mimetype,
            });

        if (uploadError) {
            console.error('Error uploading image to Supabase:', uploadError);
            return res.status(500).json({ error: 'Failed to upload image' });
        }

        // Construct the public URL for the uploaded image
        const publicURL = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${data.path}`;

        const { error: deleteError } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET_NAME)
            .remove([`${folderPath}/.keep`]);

        if (deleteError) {
            console.warn('No .keep file found, or failed to delete:', deleteError);
        }
        res.status(201).json({ publicURL });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Delete an album and its images from Supabase and the database
const deleteAlbum = async (req, res) => {
    try {
        const { coupleId, albumName } = req.params;

        // Check if the album exists in the database
        const existingAlbum = await prisma.album.findUnique({
            where: { name: albumName }
        });

        if (!existingAlbum) {
            return res.status(404).json({ error: 'Album not found' });
        }

        const folderPath = `${coupleId}/${albumName}`;

        // List all files in the album folder on Supabase
        const { data, error } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET_NAME)
            .list(folderPath);

        if (error) {
            console.error('Error listing files in Supabase storage:', error);
            return res.status(500).json({ error: 'Failed to retrieve album images for deletion' });
        }

        // Delete each file in the folder
        if (data && data.length > 0) {
            const filesToDelete = data.map(file => `${folderPath}/${file.name}`);
            const { error: deleteError } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .remove(filesToDelete);

            if (deleteError) {
                console.error('Error deleting images from Supabase:', deleteError);
                return res.status(500).json({ error: 'Failed to delete album images from storage' });
            }
        }

        // Delete the album record from the database
        await prisma.album.delete({
            where: { name: albumName }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).json({ error: 'Failed to delete album' });
    }
};

const deleteImage = async (req, res) => {
    try {
        const { coupleId, albumName, imageName } = req.params;

        const filePath = `${coupleId}/${albumName}/${imageName}`;

        // Remove the image from Supabase storage
        const { error } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET_NAME)
            .remove([filePath]);

        if (error) {
            console.error("Error deleting image from Supabase:", error);
            return res.status(500).json({ error: "Failed to delete image" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: "An error occurred while deleting the image." });
    }
};

const changeAlbumName = async (req, res) => {
    try {
        const { albumName, newAlbumName, coupleId } = req.body;

        // Check if new album name already exists in the database
        const existingAlbum = await prisma.album.findUnique({
            where: { name: newAlbumName },
        });

        if (existingAlbum) {
            return res.status(400).json("Album name already exists");
        }

        // Update the album name in the database
        const updatedAlbum = await prisma.album.update({
            where: { name: albumName },
            data: { name: newAlbumName },
        });

        // Rename the album folder in Supabase storage
        const oldFolderPath = `${coupleId}/${albumName}`;
        const newFolderPath = `${coupleId}/${newAlbumName}`;

        // List all files in the old folder
        const { data: files, error: listError } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET_NAME)
            .list(oldFolderPath);

        if (listError) {
            console.error("Error listing files:", listError);
            return res.status(500).json({ error: "Failed to rename album folder" });
        }

        // Move each file to the new folder path
        for (const file of files) {
            const oldFilePath = `${oldFolderPath}/${file.name}`;
            const newFilePath = `${newFolderPath}/${file.name}`;
            
            const { error: moveError } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .move(oldFilePath, newFilePath);
                
            if (moveError) {
                console.error("Error moving file:", moveError);
                return res.status(500).json({ error: "Failed to move album files" });
            }
        }

        res.status(200).json({
            message: "Album name and folder updated successfully",
            updatedAlbum,
        });
    } catch (error) {
        console.error("Error changing album name:", error);
        res.status(500).json({ error: "Failed to change album name" });
    }
};


module.exports = {
    getAlbum,
    getImages,
    createAlbum,
    uploadImage,
    deleteAlbum,
    deleteImage,
    changeAlbumName,
};
