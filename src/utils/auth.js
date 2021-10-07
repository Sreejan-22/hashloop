export const isAuthenticated = () => {
  return localStorage.getItem("user") ? true : false;
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("user")).token;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
