import React, { useState } from 'react';
import './style.css';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { User } from 'src/types/card';
import Input from './Input';
import ChoiseInputs from './ChoiseInputs';

interface IProps {
  addCard: (newCard: User) => void;
}

const AddCardForm: React.FC<IProps> = (props) => {
  const [showMessage, setMessage] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const simpleInputProps = [
    {
      label: 'Name',
      name: 'name',
      register,
      rules: {
        required: 'This field is required',
        minLength: {
          value: 3,
          message: 'Min length is 3 chars',
        },
      },
      error: errors.name,
    },
    {
      label: 'Date of birth',
      name: 'date',
      register,
      rules: {
        required: 'This field is required',
      },
      error: errors.date,
      type: 'date',
    },
    {
      label: 'Avatar',
      name: 'img',
      register,
      rules: {
        required: 'This field is required',
      },
      error: errors.img,
      type: 'file',
      accept: '.png, .jpg, .jpeg',
    },
  ];

  const choiseInputProps = [
    {
      label: 'Choise your favorite BLACKPINK members:',
      name: 'members',
      register,
      rules: {
        required: 'This field is required',
      },
      error: errors.members,
      type: 'checkbox',
      values: ['Jennie', 'Jisoo', 'Rose', 'Lisa'],
    },
    {
      label: 'Are cats beautiful?',
      name: 'pets',
      register,
      rules: {
        required: 'This field is required',
      },
      error: errors.pets,
      type: 'radio',
      values: ['Absolutely', 'Of course'],
    },
  ];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setMessage(true);
    const img = URL.createObjectURL(data.img[0]);
    const newCard = { ...data, img };
    props.addCard(newCard);
    reset();
    setTimeout(() => setMessage(false), 10000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="add-card-form" className="form">
      <h2 className="title">Add user</h2>

      {simpleInputProps.map((prop) => {
        return <Input {...prop} key={prop.name}></Input>;
      })}

      {choiseInputProps.map((prop) => (
        <ChoiseInputs {...prop} key={prop.name}></ChoiseInputs>
      ))}

      <div className="form">
        <p>Select your favorite programming language:</p>
        <select
          {...register('language', {
            minLength: {
              value: 2,
              message: 'Select one option',
            },
          })}
        >
          <option value="java script">java script</option>
          <option value="type script">type script</option>
          <option value="coffee script">coffee script</option>
        </select>
        {errors.language && <span className="err">{String(errors.language.message)}</span>}
      </div>
      <button className="btn" type="submit">
        Add user
      </button>
      {showMessage ? <p className="message">Card was added</p> : null}
    </form>
  );
};

export default AddCardForm;
