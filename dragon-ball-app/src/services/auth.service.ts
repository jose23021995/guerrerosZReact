import { type AuthResponse } from '@/interfaces/auth.interface';

export const authService = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    // Simulamos una demora de red para que la prueba sea realista
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
          resolve({
            user: { username: 'admin', role: 'administrator' },
            token: 'fake-jwt-token-dbz-123'
          });
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};
