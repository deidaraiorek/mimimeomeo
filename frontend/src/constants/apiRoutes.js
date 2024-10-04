

// Notes API
// /constants/apiRoutes.js

const API_BASE_URL =  process.env.BACKEND_API || 'http://localhost:3000';


// Define endpoints with dynamic segments as functions
export const API_ROUTES = {
    // Notes API
  CREATE_NOTE: `${API_BASE_URL}/notes`,
  GET_NOTE: (noteId) => `${API_BASE_URL}/notes/${noteId}`, // Dynamic note ID
  GET_COUPLE_NOTES: (coupleId) => `${API_BASE_URL}/couples/${coupleId}/notes`, // Dynamic couple ID
  UPDATE_NOTE: (noteId) => `${API_BASE_URL}/notes/${noteId}`,
  DELETE_NOTE: (noteId) => `${API_BASE_URL}/notes/${noteId}`,
};

export default API_ROUTES;
