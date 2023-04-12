type Card = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export default Card;

export type User = {
  name: string;
  date: string;
  img: string;
  pets: string;
  language: string;
  members: string[];
};
