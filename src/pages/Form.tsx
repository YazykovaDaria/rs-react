import React, { useState } from 'react';
import './style.css';
import AddCardForm from 'src/components/form/AddCardForm';
import UserCard from 'src/components/cards/UserCard';
import { User } from 'src/types/card';
import EmptyProps from 'src/types/props';

const FormPage: React.FC<EmptyProps> = () => {
  const [cards, setCards] = useState<User[]>([]);

  const addCard = (newCard: User): void => {
    setCards([...cards, newCard]);
  };

  return (
    <div className="wrapper">
      <AddCardForm addCard={addCard}></AddCardForm>
      <div className="flex-wrap" data-testid="user-card">
        {cards.map((card: User) => {
          return <UserCard {...card} key={Date.now()}></UserCard>;
        })}
      </div>
    </div>
  );
};

export default FormPage;
