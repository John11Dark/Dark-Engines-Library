import routes from "./routes.js";
import { redirect } from "./main.js";
import client from "./client.js";

function generateUniqueId() {
  const uniqueValue = "self.crypto.randomUUID()";
  localStorage.setItem("x-he-us-un-as", uniqueValue);
}

async function login(email, password) {
  const response = await client.login(email, password);

  isAuthenticated("token");
  return { ok: true, message: response.message };
}

async function register(data) {
  const response = await client.register(data);
  isAuthenticated("token");
  return { ok: true, message: response.message };
}

function logout() {
  localStorage.removeItem("x-he-us-un-as");
  localStorage.removeItem("session-UUI-ID");
  redirect(routes.INDEX);
}

function isAuthenticated(token) {
  return token === "token";
}

function restrictIndexPage(token) {
  if (
    window.location.href.toLowerCase().includes("/index.html") &&
    isAuthenticated(token)
  ) {
    redirect(routes.HOME);
  } else if (
    window.location.href.toLowerCase().includes("/home.html") &&
    !isAuthenticated(token)
  ) {
    redirect(routes.INDEX);
  } else if (
    window.location.href.toLowerCase().includes("/books.html") &&
    !isAuthenticated(token)
  ) {
    redirect(routes.INDEX);
  }
}

export default {
  login,
  register,
  logout,
  isAuthenticated,
  restrictIndexPage,
  generateUniqueId,
};
