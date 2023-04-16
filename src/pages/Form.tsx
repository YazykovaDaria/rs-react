import React from 'react';
import './style.css';
import { useAppSelector } from 'src/hooks/reduxHook';
import AddCardForm from 'src/components/form/AddCardForm';
import UserCard from 'src/components/cards/UserCard';
import { User } from 'src/types/card';

const FormPage = () => {
  const { userCards } = useAppSelector((state) => state.userCards);

  return (
    <div className="wrapper">
      <AddCardForm></AddCardForm>
      <div className="flex-wrap" data-testid="user-card">
        {userCards.map((card: User) => {
          const key = new Date().toISOString();
          return <UserCard {...card} key={key}></UserCard>;
        })}
      </div>
    </div>
  );
};

export default FormPage;
