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
export default { getBooks, getCountriesCode };
