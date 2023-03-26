import React from 'react';
import './style.css';
import { User } from 'src/types.ts/card';

function UserCard(props: User) {
  const { name, date, img, pets, members, language } = props;

  return (
    <div className="card" data-testid="card">
      <p className="title">{name}</p>
      <div className="card-list">
        <img src={img} alt=" " />
        <p>{`Date of birth: ${date}`}</p>
        <p>{`Cats are ${pets[0].toUpperCase()} beautiful`}</p>
        <p>{`My favorite language is ${language.toUpperCase()}`}</p>
        <p>Best girls in the world are:</p>
        {members.map((member: string) => {
          return <p key={member}>{member}</p>;
        })}
      </div>
    </div>
  );
}

export default UserCard;
