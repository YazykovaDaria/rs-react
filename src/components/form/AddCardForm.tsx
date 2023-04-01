import React, { useState } from 'react';
import './style.css';
import { useForm } from 'react-hook-form';
import { User } from 'src/types/card';
import Input from './Input';

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

  const simpleInpytProps = [
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

  const onSubmit = (data) => {
    setMessage(true);
    const img = URL.createObjectURL(data.img[0]);
    const newCard = { ...data, img };
    props.addCard(newCard);
    reset();
    setTimeout(() => setMessage(false), 8000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="add-card-form" className="form">
      <h2 className="title">Add user</h2>

      {simpleInpytProps.map((prop) => {
        return <Input {...prop} key={prop.name}></Input>;
      })}

      <fieldset>
        <input
          {...register('members', { required: 'This field is required' })}
          id="jiso"
          type="checkbox"
          value="Jisoo"
        />
        <label htmlFor="jiso">Jisoo</label>
        <input
          {...register('members', { required: 'This field is required' })}
          type="checkbox"
          value="Jennie"
          id="jennie"
        />
        <label htmlFor="jennie">Jennie</label>
        <input
          {...register('members', { required: 'This field is required' })}
          type="checkbox"
          value="Rose"
          id="rose"
        />
        <label htmlFor="rose">Rose</label>
        <input
          {...register('members', { required: 'This field is required' })}
          type="checkbox"
          value="Lisa"
          id="lisa"
        />
        <label htmlFor="lisa">Lisa</label>
      </fieldset>
      {errors.members && <span className="err">{errors.members.message}</span>}

      <fieldset>
        <input
          {...register('pets', { required: 'This field is required' })}
          type="radio"
          value="absolutely"
          id="langYes"
        />
        <label htmlFor="langYes">Absolutely</label>
        <input
          {...register('pets', { required: 'This field is required' })}
          type="radio"
          value="of course"
          id="lang"
        />
        <label htmlFor="lang">Of course</label>
      </fieldset>
      {errors.pets && <span className="err">{errors.pets.message}</span>}

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
      {errors.language && <span className="err">{errors.language.message}</span>}

      <button className="btn" type="submit">
        Add user
      </button>
      {showMessage ? <p>Card was added</p> : null}
    </form>
  );
};

export default AddCardForm;
