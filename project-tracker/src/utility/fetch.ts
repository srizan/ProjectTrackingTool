import { API_CONFIG } from '../config';

export const fetchWithBaseUrl = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_CONFIG.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  // Merge default options with provided options, avoiding mutation
  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json', // Default for PUT/POST
    },
  };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    const errorText = await response.text(); // Capture response body for errors
    return {errorText} as T;//throw new Error(`Fetch failed: ${response.status} - ${response.statusText} - ${errorText || 'No details'}`);
  }

  // Handle cases where the response might be empty (e.g., 204 No Content)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return {} as T; // Default to empty object if no JSON (adjust based on API behavior)
};