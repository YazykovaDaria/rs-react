import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import AddCardForm from 'src/components/form/AddCardForm';
import UserCard from 'src/components/cards/UserCard';
import { User } from 'src/types/card';

const FormPage = () => {
  const { userCards } = useSelector((state) => state.userCards);

  return (
    <div className="wrapper">
      <AddCardForm></AddCardForm>
      <div className="flex-wrap" data-testid="user-card">
        {userCards.map((card: User) => {
          const key = Date.now();
          return <UserCard {...card} key={key}></UserCard>;
        })}
      </div>
    </div>
  );
};

export default FormPage;
