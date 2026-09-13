import axios from "axios";

// Set REACT_APP_API_URL in a .env file at the project root to point
// this at your deployed Django backend, e.g.:
//   REACT_APP_API_URL=https://api.yourchurch.org/api
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the admin auth token (if logged in) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// If a token ever becomes invalid, clear it so the admin is sent back to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
    return Promise.reject(error);
  }
);

/**
 * Builds a FormData object from a plain object, skipping empty/undefined
 * values. Used for every admin create/update call so file fields (images,
 * PDFs) and plain text fields — including URL-shaped ones like
 * youtube_link or website_url — can be submitted together through the
 * same multipart request. Unchanged file fields are handled upstream in
 * ResourceFormModal (they're kept as `null` until a new file is picked),
 * so this function doesn't need to guess based on a value's shape.
 */
export const toFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    formData.append(key, value);
  });
  return formData;
};

const multipart = { headers: { "Content-Type": "multipart/form-data" } };

/* ==================== CHURCH: SERMONS ==================== */
export const getSermons = (params) => api.get("/sermons/", { params });
export const getSermon = (id) => api.get(`/sermons/${id}/`);
export const createSermon = (data) => api.post("/sermons/", toFormData(data), multipart);
export const updateSermon = (id, data) => api.patch(`/sermons/${id}/`, toFormData(data), multipart);
export const deleteSermon = (id) => api.delete(`/sermons/${id}/`);

/* ==================== CHURCH: BIBLICAL RESOURCES ==================== */
export const getBiblicalResources = (params) => api.get("/biblical-resources/", { params });
export const getBiblicalResource = (id) => api.get(`/biblical-resources/${id}/`);
export const createBiblicalResource = (data) =>
  api.post("/biblical-resources/", toFormData(data), multipart);
export const updateBiblicalResource = (id, data) =>
  api.patch(`/biblical-resources/${id}/`, toFormData(data), multipart);
export const deleteBiblicalResource = (id) => api.delete(`/biblical-resources/${id}/`);

/* ==================== CHURCH: COUNSELING REQUESTS ==================== */
export const submitCounselingRequest = (data) => api.post("/counseling-requests/", data);
export const getCounselingRequests = (params) => api.get("/counseling-requests/", { params });
export const updateCounselingRequest = (id, data) => api.patch(`/counseling-requests/${id}/`, data);
export const deleteCounselingRequest = (id) => api.delete(`/counseling-requests/${id}/`);

/* ==================== CHURCH: FAQS ==================== */
export const getFAQs = () => api.get("/faqs/");
export const submitFAQ = (data) => api.post("/faqs/", data);
export const createFAQ = (data) => api.post("/faqs/", data);
export const updateFAQ = (id, data) => api.patch(`/faqs/${id}/`, data);
export const deleteFAQ = (id) => api.delete(`/faqs/${id}/`);

/* ==================== CHURCH: SUBMITTED QUESTIONS ==================== */
export const getQuestions = (params) => api.get("/questions/", { params });
export const submitQuestion = (data) => api.post("/questions/", data);
export const updateQuestion = (id, data) => api.patch(`/questions/${id}/`, data);
export const deleteQuestion = (id) => api.delete(`/questions/${id}/`);

/* ==================== COLLEGE / SEMINARY: PROGRAMS ==================== */
export const getPrograms = () => api.get("/programs/");
export const getProgram = (id) => api.get(`/programs/${id}/`);
export const createProgram = (data) => api.post("/programs/", toFormData(data), multipart);
export const updateProgram = (id, data) => api.patch(`/programs/${id}/`, toFormData(data), multipart);
export const deleteProgram = (id) => api.delete(`/programs/${id}/`);

/* ==================== COLLEGE: ENROLLMENT FORMS ==================== */
export const getEnrollmentForms = () => api.get("/enrollment-forms/");
export const createEnrollmentForm = (data) =>
  api.post("/enrollment-forms/", toFormData(data), multipart);
export const updateEnrollmentForm = (id, data) =>
  api.patch(`/enrollment-forms/${id}/`, toFormData(data), multipart);
export const deleteEnrollmentForm = (id) => api.delete(`/enrollment-forms/${id}/`);

/* ==================== COLLEGE: ENROLLMENT SUBMISSIONS ==================== */
export const submitEnrollment = (formData) =>
  api.post("/enrollment-submissions/", formData, multipart);
export const getEnrollmentSubmissions = (params) =>
  api.get("/enrollment-submissions/", { params });
export const updateEnrollmentSubmission = (id, data) =>
  api.patch(`/enrollment-submissions/${id}/`, data);
export const deleteEnrollmentSubmission = (id) => api.delete(`/enrollment-submissions/${id}/`);

/* ==================== MISSIONS: PARTNERS ==================== */
export const getPartners = () => api.get("/partners/");
export const createPartner = (data) => api.post("/partners/", toFormData(data), multipart);
export const updatePartner = (id, data) => api.patch(`/partners/${id}/`, toFormData(data), multipart);
export const deletePartner = (id) => api.delete(`/partners/${id}/`);

/* ==================== MISSIONS: DOCUMENTS ==================== */
export const getMissionDocuments = (params) => api.get("/mission-documents/", { params });
export const createMissionDocument = (data) =>
  api.post("/mission-documents/", toFormData(data), multipart);
export const updateMissionDocument = (id, data) =>
  api.patch(`/mission-documents/${id}/`, toFormData(data), multipart);
export const deleteMissionDocument = (id) => api.delete(`/mission-documents/${id}/`);

/* ==================== MISSIONS: ACTIVE MISSIONS ==================== */
export const getActiveMissions = () => api.get("/active-missions/");
export const createActiveMission = (data) =>
  api.post("/active-missions/", toFormData(data), multipart);
export const updateActiveMission = (id, data) =>
  api.patch(`/active-missions/${id}/`, toFormData(data), multipart);
export const deleteActiveMission = (id) => api.delete(`/active-missions/${id}/`);

/* ==================== ABOUT: BELIEFS ==================== */
export const getBeliefs = () => api.get("/beliefs/");
export const createBelief = (data) => api.post("/beliefs/", toFormData(data), multipart);
export const updateBelief = (id, data) => api.patch(`/beliefs/${id}/`, toFormData(data), multipart);
export const deleteBelief = (id) => api.delete(`/beliefs/${id}/`);

/* ==================== ABOUT: LEADERSHIP ==================== */
export const getLeadership = (category) =>
  api.get("/leadership/", { params: category ? { category } : {} });
export const createLeadershipMember = (data) =>
  api.post("/leadership/", toFormData(data), multipart);
export const updateLeadershipMember = (id, data) =>
  api.patch(`/leadership/${id}/`, toFormData(data), multipart);
export const deleteLeadershipMember = (id) => api.delete(`/leadership/${id}/`);

/* ==================== UPDATES: ANNOUNCEMENTS ==================== */
export const getAnnouncements = () => api.get("/announcements/");
export const createAnnouncement = (data) =>
  api.post("/announcements/", toFormData(data), multipart);
export const updateAnnouncement = (id, data) =>
  api.patch(`/announcements/${id}/`, toFormData(data), multipart);
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}/`);

/* ==================== UPDATES: EVENTS ==================== */
export const getEvents = (when) => api.get("/events/", { params: when ? { when } : {} });
export const createEvent = (data) => api.post("/events/", toFormData(data), multipart);
export const updateEvent = (id, data) => api.patch(`/events/${id}/`, toFormData(data), multipart);
export const deleteEvent = (id) => api.delete(`/events/${id}/`);

/* ==================== GALLERY ==================== */
export const getGallery = (params) => api.get("/gallery/", { params });
export const createGalleryImage = (data) => api.post("/gallery/", toFormData(data), multipart);
export const updateGalleryImage = (id, data) =>
  api.patch(`/gallery/${id}/`, toFormData(data), multipart);
export const deleteGalleryImage = (id) => api.delete(`/gallery/${id}/`);

/* ==================== PLAN YOUR VISIT ==================== */
export const submitVisitRequest = (data) => api.post("/visits/", data);
export const getVisitRequests = (params) => api.get("/visits/", { params });
export const updateVisitRequest = (id, data) => api.patch(`/visits/${id}/`, data);
export const deleteVisitRequest = (id) => api.delete(`/visits/${id}/`);

/* ==================== CAREERS ==================== */
export const getCareers = (params) => api.get("/careers/", { params });
export const getCareer = (id) => api.get(`/careers/${id}/`);
export const createCareer = (data) => api.post("/careers/", toFormData(data), multipart);
export const updateCareer = (id, data) => api.patch(`/careers/${id}/`, toFormData(data), multipart);
export const deleteCareer = (id) => api.delete(`/careers/${id}/`);

export const submitCareerApplication = (formData) =>
  api.post("/career-applications/", formData, multipart);
export const getCareerApplications = (params) => api.get("/career-applications/", { params });
export const updateCareerApplication = (id, data) => api.patch(`/career-applications/${id}/`, data);
export const deleteCareerApplication = (id) => api.delete(`/career-applications/${id}/`);

/* ==================== AUTH ==================== */
export const loginAdmin = (username, password) =>
  api.post("/auth/token/", { username, password });

// There's no "who am I" endpoint on the backend (the token endpoint only
// returns a token), so the admin panel remembers the username that was
// typed in at login, purely for display in the topbar.
export const setStoredAdminUser = (username) => localStorage.setItem("authUser", username);
export const getStoredAdminUser = () => localStorage.getItem("authUser");

export const logoutAdmin = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
};

export default api;