const URL = "";
async function getBooks(query) {
  const response = await fetch(`https://api.itbook.store/1.0/search/${query}`);
  if (!response.ok) return null;

  const { books } = await response.json();
  return books;
}

async function getCountriesCode(url) {
  const response = await fetch(url);
  if (!response.ok) return null;
  const countries = await response.json();
  return countries;
}

async function login(email, password) {
  // const response = await fetch(`${URL}/user`, {
  //   method: "POST",
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json",
  //     xUiqValue: localStorage.getItem("x-he-us-un-as"),
  //   },
  //   body: JSON.stringify({ email, password }),
  // });

  // if (!response.ok) return response?.data?.error;

  // const data = await response.json();
  return true;
}

async function register(user) {
  // const response = await fetch(`${URL}/user`, {
  //   method: "POST",
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     xUiqValue: localStorage.getItem("x-he-us-un-as"),
  //   },
  //   body: JSON.stringify(user),
  // });

  // if (!response.ok) return response?.data?.error;

  // const data = await response.json();
  return true;
}
export default { getBooks, getCountriesCode, login, register };
