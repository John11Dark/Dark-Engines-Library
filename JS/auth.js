import routes from "./routes.js";
function login(email, password) {
  //console.log(password, email);
  // console.log(routes.HOME);
  window.location = routes.HOME;
}
function register(data) {
  window.location = routes.HOME;
}
function logout() {
  window.location = routes.INDEX;
}
function isAuthenticated() {
  return true;
}
export default { login, register, logout, isAuthenticated };
