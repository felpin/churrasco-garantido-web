export const getToken = () => sessionStorage.getItem('token');

export const isAuthenticated = () => !!(getToken());

export const setToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const removeToken = () => sessionStorage.removeItem('token');
