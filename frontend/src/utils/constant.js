const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL || "https://your-backend-url.railway.app"
  : "http://localhost:3000";

export const USER_API_END_POINT = `${API_BASE_URL}/api/v1/user`;
export const PROJECT_API_END_POINT = `${API_BASE_URL}/api/v1/project`;
export const PROPOSAL_API_END_POINT = `${API_BASE_URL}/api/v1/proposal`;
export const CLIENT_API_END_POINT = `${API_BASE_URL}/api/v1/client`;
