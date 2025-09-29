export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config;
