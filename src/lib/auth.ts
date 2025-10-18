import { callApi } from './api';

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    email: string;
    name: string;
  };
}

/**
 * Register a new user
 * @param userData User registration data
 * @returns Promise with auth response including token
 */
export const signup = async (userData: SignupData): Promise<AuthResponse> => {
  return await callApi('post', '/auth/register', userData);
};

/**
 * Login an existing user
 * @param loginData User login credentials
 * @returns Promise with auth response including token
 */
export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  return await callApi('post', '/auth/login', loginData);
};

/**
 * Store authentication token in localStorage
 * @param token JWT token
 */
export const setAuthToken = (data: {name:string;email:string;token:string}): void => {
  localStorage.setItem('userData', JSON.stringify(data));
};

/**
 * Get authentication token from localStorage
 * @returns Stored JWT token or null if not found
 */
export const getUserData = (): {name:string;email:string;token:string} | null => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

/**
 * Remove user data from localStorage
 */
export const removeUserData = (): void => {
  localStorage.removeItem('userData');
};

/**
 * Check if user is authenticated
 * @returns Boolean indicating if user has a stored token
 */
export const isAuthenticated = (): boolean => {
  return !!getUserData();
};