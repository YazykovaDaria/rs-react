import React from 'react';
import './style.css';
import AddCardForm from 'src/components/form/AddCardForm';
import UserCard from 'src/components/cards/UserCard';
import { User } from 'src/types/card';
import EmptyProps from 'src/types/props';

interface IState {
  cards: User[];
}

class FormPage extends React.Component<EmptyProps, IState> {
  constructor(props: EmptyProps) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  addCard = (newCard: User): void => {
    this.setState((prevState) => ({
      cards: [...prevState.cards, newCard],
    }));
  };

  render(): React.ReactNode {
    return (
      <div className="wrapper">
        <AddCardForm addCard={this.addCard}></AddCardForm>
        <div className="flex-wrap">
          {this.state.cards.map((card: User) => {
            return <UserCard {...card} key={Date.now()}></UserCard>;
          })}
        </div>
      </div>
    );
  }
}

export default FormPage;
