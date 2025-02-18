export const API_CONFIG = {
  BASE_URL: 'http://localhost/api',
  ENDPOINTS: {
    USERS: {
      LOGIN: '/users/login',
      REGISTER: '/users/register',
    },
    RECOMMENDATIONS: {
      CALORIES: '/recommendations/get-calories',
      DIET_PLAN: '/recommendations/dietplan',
      WORKOUT: '/recommendations/workout',
    },
    SESSIONS: {
      CREATE: '/sessions/create',
      GET_BY_ID: (id: string) => `/sessions/${id}`,
      GET_BY_TRAINER: (trainerId: string) => `/sessions/trainer/${trainerId}`,
      GET_BY_TRAINEE: (traineeId: string) => `/sessions/trainee/${traineeId}`,
    },
  },
} as const;

// Helper function to construct full URLs
export const getFullUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Base URL
