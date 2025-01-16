import axios from 'axios';

const API = axios.create({ baseURL: 'https://upm-backend-sgq2.onrender.com/api' });

// Fetch all contact logs
export const fetchContactLogs = () => API.get('/contact-logs');

// Fetch contacts with filters
export const fetchContacts = (filters) => API.get('/contacts', { params: filters });

// Fetch all categories
export const fetchCategories = () => API.get('/categories');

// Add a new category
export const addCategory = (name) =>
  API.post('/categories', { name });

// Update a category
export const updateCategory = (id, name) =>
  API.put(`/categories/${id}`, { name });

// Delete a category
export const deleteCategory = (id) =>
  API.delete(`/categories/${id}`);

// Fetch all regions
export const fetchRegions = () => API.get('/regions');

// Add a new region
export const addRegion = (name) =>
  API.post('/regions', { name });

// Update a region
export const updateRegion = (id, name) =>
  API.put(`/regions/${id}`, { name });

// Delete a region
export const deleteRegion = (id) =>
  API.delete(`/regions/${id}`);

// Log an action
export const logAction = (contactId, action) =>
  API.post('/contact-logs', { contactId, action });

// Send email and mark query as resolved
export const sendEmail = (contactId, message) =>
  API.post('/contact-logs/send-email', { contactId, message });

// Fetch contact details by contactId
export const fetchContactDetails = (contactId) =>
  API.get(`/contact-logs/contact/${contactId}`);
