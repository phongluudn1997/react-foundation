import { client } from "utils/api-client";

const localStorageKey = "__auth_provider_token__";

function handleUserResponse({ data }) {
  const { token } = data;
  window.localStorage.setItem(localStorageKey, token);
  return data;
}

function register({ email, password }) {
  return client("/users/register", {
    data: {
      email,
      password,
    },
  }).then(handleUserResponse);
}

function login({ email, password }) {
  return client("/users/login", {
    data: {
      email,
      password,
    },
  }).then(handleUserResponse);
}

function logout() {
  return window.localStorage.removeItem(localStorageKey);
}

async function getToken() {
  return await window.localStorage.getItem(localStorageKey);
}

export { register, logout, getToken, login };
