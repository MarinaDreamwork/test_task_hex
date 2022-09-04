const TOKEN = 'access-token';
const TOKEN_TYPE = 'token-type';
const EXPIRES_DATE = 'expires-date';
const USERNAME = 'username';
const PASSWORD = 'password';

export const setToken = ({
  access_token: accessToken,
  token_type: tokenType,
  username,
  password
}) => {
  const expiresDate = new Date().getTime() + 300 * 1000;
  localStorage.setItem(USERNAME, username);
  localStorage.setItem(PASSWORD, password);
  localStorage.setItem(TOKEN, accessToken);
  localStorage.setItem(TOKEN_TYPE, tokenType);
  localStorage.setItem(EXPIRES_DATE, expiresDate);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN);
};

export const getUsername = () => {
  return localStorage.getItem(USERNAME);
};

export const getPassword = () => {
  return localStorage.getItem(PASSWORD);
};

export const getTokenExpiresDate = () => {
  return localStorage.getItem(EXPIRES_DATE);
};

export const getTokenType = () => {
  return localStorage.getItem(TOKEN_TYPE);
};

const localStorageService = {
  setToken,
  getAccessToken,
  getTokenExpiresDate,
  getTokenType,
  getUsername,
  getPassword
};

export default localStorageService;