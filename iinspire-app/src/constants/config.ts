export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/api/login`,
  getStudentResources: `${API_BASE_URL}/api/getLinks`,
  results: `${API_BASE_URL}/api/survey-results-user`,
  getProgramsByPC: `${API_BASE_URL}/api/getPCprograms`,
  // Add other endpoints here
};