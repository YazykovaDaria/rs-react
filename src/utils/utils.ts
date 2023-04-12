import Card from 'src/types/card';

function getSavedSearchVal(): string {
  const savedVal = localStorage.getItem('search');
  return savedVal || '';
}

export default getSavedSearchVal;

const baseUrl = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (url = ''): Promise<Card[]> => {
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

export const getCharacter = async (url = ''): Promise<Card | undefined> => {
  try {
    const response = await fetch(`${baseUrl}${url}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
