export const isAuthenticated = () => {
  return !!(getToken());
};

export const setToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const getToken = () => sessionStorage.getItem('token');