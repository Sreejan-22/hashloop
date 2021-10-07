export const isAuthenticated = () => {
  return localStorage.getItem("user") ? true : false;
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("user")).token;
};
