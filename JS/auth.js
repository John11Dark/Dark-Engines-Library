import routes from "./routes.js";
import { redirect } from "./main.js";
function login(email, password) {
  //console.log(password, email);
  // console.log(routes.HOME);
  redirect(routes.HOME);
}
function register(data) {
  const { name, surname, image, dateofbirth } = data;
  redirect(routes.HOME);
}
function logout() {
  redirect(routes.INDEX);
}
function isAuthenticated() {
  return false;
}

function restrictIndexPage() {
  if (
    window.location.href.toLowerCase().includes("/index.html") &&
    isAuthenticated()
  ) {
    redirect(routes.HOME);
  } else if (
    window.location.href.toLowerCase().includes("/home.html") &&
    !isAuthenticated()
  ) {
    redirect(routes.INDEX);
  } else if (
    window.location.href.toLowerCase().includes("/books.html") &&
    !isAuthenticated()
  ) {
    redirect(routes.INDEX);
  }
}
export default { login, register, logout, isAuthenticated, restrictIndexPage };
