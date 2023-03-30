type Card = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
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
