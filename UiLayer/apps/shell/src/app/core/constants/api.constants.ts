export const API_CONFIG = {
  BASE_URL: 'http://localhost/api',
  ENDPOINTS: {
    USERS: {
      LOGIN: '/users/login',
      REGISTER: '/users/register',
    },
  },
} as const;

// Helper function to construct full URLs
export const getFullUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
