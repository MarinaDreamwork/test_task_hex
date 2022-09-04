const TOKEN = 'access-token';
const TOKEN_TYPE = 'token-type';
const EXPIRES_DATE = 'expires-date';

export const setToken = ({
  access_token: accessToken,
  token_type: tokenType,
}) => {
  const expiresDate = new Date().getTime() + 300 * 1000;
  localStorage.setItem(TOKEN, accessToken);
  localStorage.setItem(TOKEN_TYPE, tokenType);
  localStorage.setItem(EXPIRES_DATE, expiresDate);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN);
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
  getTokenType
};

export default localStorageService;