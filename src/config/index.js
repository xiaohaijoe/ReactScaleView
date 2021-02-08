let baseUrl = '';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  baseUrl = 'http://30.23.76.7';
}
export const API_ROOT = baseUrl;
export const API_CONTEXT = '/admin';
export const MOCK_ROOT = '/mock';
