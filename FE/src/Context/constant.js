export const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333"
    : process.env.REACT_APP_API_URL;
export const LOCAL_STORAGE_TOKEN_NAME = "tokenDoan";
export const USER_ROLE = "";
export const ROLE = "ROLE";
