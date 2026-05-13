import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dragonball-api.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Petición: Agrega el Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Respuesta: Manejo global de errores (como el 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el token expira o es inválido, limpiamos y redirigimos
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
