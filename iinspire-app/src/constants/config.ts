export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/api/login`,
  getStudentResources: `${API_BASE_URL}/api/getlinks`,
  addStudentResource: `${API_BASE_URL}/api/newLink`,
  deleteStudentResource: `${API_BASE_URL}/api/deletelink`,
  results: `${API_BASE_URL}/api/survey-results-user`,
  getProgramsByPC: `${API_BASE_URL}/api/getPCprograms`,
  fetchQuestions: `${API_BASE_URL}/api/questions`,
  saveResponses: `${API_BASE_URL}/api/survey-results`,
  createAccount: `${API_BASE_URL}/api/newuser`,
  deleteProgram: `${API_BASE_URL}/api/deleteProgram`,
  newProgram: `${API_BASE_URL}/api/newprogram`,
  getProgramsAdmin: `${API_BASE_URL}/api/getprograms`,
  getUsersInProgram: `${API_BASE_URL}/api/usersprogram`,
  adminProgramResultsCSV: `${API_BASE_URL}/api/program-survey-results`,
  getQuestionsCSV: `${API_BASE_URL}/api/questionsCSV`,
  getAdminCodes: `${API_BASE_URL}/api/getAdminCodes`

  // Add other endpoints here
};