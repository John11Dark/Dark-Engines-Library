async function getBooks(query) {
  const response = await fetch(`https://api.itbook.store/1.0/search/${query}`);
  if (!response.ok) return null;

  const { books } = await response.json();
  return books;
}

export default { getBooks };
