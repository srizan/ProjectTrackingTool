// src/utils/fetch.ts
import { API_CONFIG } from '../config';

export const fetchWithBaseUrl = async (endpoint: string, options = {}) => {
  const url = `${API_CONFIG.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
  return response.json();
};