import { redirect } from 'next/navigation';
import { TokenResponse, UserLogin, UserRegistration } from './auth.interfaces';
import Cookies  from 'js-cookie'

const API_URL = 'http://127.0.0.1:8000/auth/'; 

let accessToken: string | null = null;
let refreshToken: string | null = null;
let registered: boolean = false;

export const isRegistered = (): boolean => {
  return registered;
};

export const isAuthenticated = async (): Promise<boolean> => {
  if (!accessToken) {
    accessToken = Cookies.get('accessToken') || null;
    refreshToken = Cookies.get('refreshToken') || null;
  }
  return !!accessToken;
};

export const register = async (payload: UserRegistration) => {
  try {
    const response = await fetch(`${API_URL}register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    registered = true;
    return await response.json(); // Or handle success as needed
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (payload: UserLogin): Promise<TokenResponse> => {
  try {
    const response = await fetch(`${API_URL}login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const res: TokenResponse = await response.json();
    console.log(res);
    saveTokens(res);
    return res;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

export const refreshAuthToken = async (): Promise<TokenResponse> => {
  try {
    const currentRefreshToken = Cookies.get('refreshToken');

    if (!currentRefreshToken) {
      logout();
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_URL}refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: currentRefreshToken }),
    });

    if (!response.ok) {
      logout();
      const error = await response.json();
      throw new Error(error.message || 'Failed to refresh token');
    }

    const res: TokenResponse = await response.json();
    saveTokens(res);
    return res;
  } catch (error: any) {
    console.error('Token refresh error:', error);
    logout();
    throw error;
  }
};

export const logout = async () => {
  const currentRefreshToken = Cookies.get('refreshToken');

  if (currentRefreshToken) {
    await fetch(`${API_URL}token/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: currentRefreshToken }),
    });
  }

  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');

  accessToken = null;
  refreshToken = null;
  redirect('/login');
};

const saveTokens = async (res: TokenResponse) => {
  accessToken = res.access;
  refreshToken = res.refresh;

  Cookies.set('accessToken', accessToken, { secure: process.env.NODE_ENV === 'production', path: '/' });
  Cookies.set('refreshToken', refreshToken, { secure: process.env.NODE_ENV === 'production', path: '/' });
};