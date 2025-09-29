import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser(payload.username);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return currentUser;
};