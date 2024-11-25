

// Notes API
// /constants/apiRoutes.js

const API_BASE_URL = 'http://localhost:3000';
const WEB_SOCKET_BASE_API = 'ws://localhost:3000';


// Define endpoints with dynamic segments as functions
export const API_ROUTES = {
  // Notes API
  CREATE_NOTE: `${API_BASE_URL}/notes`,
  GET_NOTE: (noteId) => `${API_BASE_URL}/notes/${noteId}`, // Dynamic note ID
  GET_COUPLE_NOTES: (coupleId) => `${API_BASE_URL}/notes/couple/${coupleId}`, // Dynamic couple ID
  UPDATE_NOTE: (noteId) => `${API_BASE_URL}/notes/${noteId}`,
  DELETE_NOTE: (noteId) => `${API_BASE_URL}/notes/${noteId}`,

  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  SENDINVITATION: `${API_BASE_URL}/invite/send`,
  SHOWINVITATION: `${API_BASE_URL}/invite/show`,
  RESPONSEINVITATION: `${API_BASE_URL}/invite/response`,
  BREAKUP: `${API_BASE_URL}/invite/breakup`,
  COUPLECHECK: (userEmail) => `${API_BASE_URL}/invite/couplecheck/${userEmail}`,

  ADD_EVENT: `${API_BASE_URL}/specialdate/addevent`,
  SHOW_EVENT: (coupleId) => `${API_BASE_URL}/specialdate/${coupleId}`,
  DELETE_EVENT: (eventId) => `${API_BASE_URL}/specialdate/${eventId}`,

  SHOW_ALBUMS: (coupleId) => `${API_BASE_URL}/gallery/${coupleId}`,
  SHOW_IMAGES: (coupleId, albumName) => `${API_BASE_URL}/gallery/album/${coupleId}/${albumName}`,
  CREATE_ALBUMS: `${API_BASE_URL}/gallery`,
  UPLOAD_IMAGE: `${API_BASE_URL}/gallery/album/upload`,
  DELETE_ALBUM: (coupleId, albumName) => `${API_BASE_URL}/gallery/${coupleId}/${albumName}`,
  DELETE_IMAGE: (coupleId, albumName, imageName) => `${API_BASE_URL}/gallery/${coupleId}/${albumName}/${imageName}`,
  CHANGE_ALBUM_NAME: `${API_BASE_URL}/gallery/album/changename`,

  RESET_LINK: `${API_BASE_URL}/forgotpassword`,
  RESET_PASSWORD: `${API_BASE_URL}/forgotpassword/setnewpw`,

  WS_CONNECT: WEB_SOCKET_BASE_API,
};

export default API_ROUTES;
