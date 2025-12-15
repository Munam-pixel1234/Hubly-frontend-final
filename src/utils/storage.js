const TOKEN_KEY = "hubly_token";
const USER_KEY = "hubly_user";

// Token
export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// User
export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = () => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};
export const removeUser = () => localStorage.removeItem(USER_KEY);

// Logout helper
export const logout = () => {
  removeToken();
  removeUser();
};
