import axios from "axios";
import Cookies from 'js-cookie';
import { showToast } from "./../../utility";
// Set the base URL for API calls
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * Main API request function
 * @param {Object} options - Request options
 * @param {string} options.method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {string} options.endpoint - API endpoint
 * @param {Object} options.data - Request body data
 * @param {Object} options.params - URL query parameters
 * @param {Object} options.headers - Custom headers
 * @param {boolean} options.isFormData - Set to true to use multipart/form-data
 * @param {boolean} options.addAuth - Set to true to add Authorization header
 * @returns {Promise<any>} - API response
 */
export async function apiRequest({
  method = "GET",
  endpoint = "",
  data = null,
  params = {},
  headers = {},
  isFormData = false,
  contentType = null, // For backward compatibility
  withCredentials = false, // Added parameter to control credentials inclusion
  addAuth = true, // New flag to control Authorization header
}) {
  // Prepend the base URL to the endpoint
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // First check cookies for access token, then fall back to localStorage
  const accessToken = Cookies.get("adminAccessToken") || localStorage.getItem("adminAccessToken") || Cookies.get("accessToken") || localStorage.getItem("accessToken");

  // Determine content type - priority: explicit contentType, then isFormData flag
  const finalContentType = contentType || (isFormData ? "multipart/form-data" : "application/json");
  
  // Process data if it's form data
  let processedData = data;
  if (finalContentType === "multipart/form-data" && data && !(data instanceof FormData)) {
    processedData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      // Handle file objects specially
      if (value instanceof File) {
        processedData.append(key, value, value.name);
      } 
      // Handle arrays
      else if (Array.isArray(value)) {
        value.forEach(item => {
          processedData.append(`${key}[]`, item);
        });
      }
      // Handle other values (including null/undefined check)
      else if (value !== null && value !== undefined) {
        processedData.append(key, value);
      }
    });
  }

  // For FormData, let axios set the content-type header with boundary
  const contentTypeHeader = processedData instanceof FormData ? {} : { "Content-Type": finalContentType };

  try {
    const response = await axios({
      method,
      url,
      data: processedData || {},
      params,
      headers: {
        ...contentTypeHeader,
        ...(addAuth && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
      withCredentials, // Dynamic parameter controlled by the function caller
      validateStatus : false
    });

    // Check for unauthorized status (401 or 403)
    if (response.status === 401 ) {
      // Redirect to /login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      // Optionally, you can return or throw here
      return;
    }

       showToast("🎉 Hooray!", response.data?.data?.message, "success");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }
      showToast("🎉 Hooray!", error.data.message, "success");
      throw new Error(error.response.data.message || "API Error");
    }
    throw error;
  }
}