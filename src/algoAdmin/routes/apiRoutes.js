import { apiRequest } from "../services/apiService.js"

export async function login(data) {
    return apiRequest({
      method: "POST",
      endpoint: "/api/token/",
      data,
      // withCredentials: true // Enable credentials for login requests
    });
  }

  export async function logout() {
    return apiRequest({
      method: "POST",
      endpoint: "/api/logout/",
      addAuth: true// Enable credentials for logout requests
    });
  }

  export async function users(params = {}) {
    return apiRequest({
      endpoint: "/users/",
      params,
      addAuth: true
    });
  }

  export async function updateUserStatus(id, is_active) {
    return apiRequest({
      method: "PATCH",
      endpoint: `/users/update-status/${id}/`,
      data: { is_active },
      addAuth: true
    });
  }

  // Subscription API functions (placeholders, update endpoints as needed)
  export async function fetchSubscriptions(params = {}) {
    return apiRequest({
      endpoint: "/subscriptions/", // Update with real endpoint if different
      params,
      addAuth: true
    });
  }

  export async function grantSubscription(userId) {
    return apiRequest({
      method: "POST",
      endpoint: `/subscriptions/grant/${userId}/`, // Update with real endpoint if different
      addAuth: true
    });
  }

  export async function revokeSubscription(userId) {
    return apiRequest({
      method: "POST",
      endpoint: `/subscriptions/revoke/${userId}/`, // Update with real endpoint if different
      addAuth: true
    });
  }

  export async function createStrategy(data) {
    return apiRequest({
      method: "POST",
      endpoint: "/api/strategy/create-strategy-with-conditions/",
      data,
      addAuth: true
    });
  }
  export async function getAllStrategies(page = 1, page_size = 10) {
    return apiRequest({
      method: "GET",
      endpoint: "/api/strategy/all-strategy/",
      params: { page, page_size },
      addAuth: true
    });
  }
  export async function getAllSubscptions(page = 1, page_size = 10) {
    return apiRequest({
      method: "GET",
      endpoint: "/api/users-subscriptions/",
      params: { page, page_size },
      addAuth: true
    });
  }
