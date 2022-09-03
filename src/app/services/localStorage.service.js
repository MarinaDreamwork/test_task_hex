const TOKEN = 'access-token';
const TOKEN_TYPE = 'token-type';

export const setToken = ({
  access_token: accessToken,
  token_type: tokenType 
}) => {
  localStorage.setItem(TOKEN, accessToken);
  localStorage.setItem(TOKEN_TYPE, tokenType);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN);
};

export const getTokenType = () => {
  return localStorage.getItem(TOKEN_TYPE);
};

const localStorageService = {
  setToken,
  getAccessToken,
  getTokenType
};

export default localStorageService;