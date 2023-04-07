import Card from 'src/types/card';

function getSavedSearchVal(): string {
  const savedVal = localStorage.getItem('search');
  return savedVal || '';
}

export default getSavedSearchVal;

export const getCharacters = async (url = ''): Promise<Card[]> => {
  const baseUrl = 'https://rickandmortyapi.com/api/character';
  try {
    const response = await fetch(`${baseUrl}${url}`);
    const data = await response.json();
    if (data.error) {
      return [];
    }
    return data.results;
  } catch (err) {
    console.log(err);
    return [];
  }
};
