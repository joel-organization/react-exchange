import dotenv from 'dotenv';

dotenv.config();

const getApiKey = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  if (!apiKey) {
    throw new Error('API key not found in environment variables');
  }
  return apiKey;
};

export { getApiKey };