function getSavedSearchVal(): string {
  const savedVal = localStorage.getItem('search');
  return savedVal || '';
}

export default getSavedSearchVal;
