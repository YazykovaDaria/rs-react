import React, { useState } from 'react';
import './style.css';
import { useForm } from 'react-hook-form';
import { User } from 'src/types/card';
import Input from './Input';

type CardError = {
  name: string;
  img: string;
  date: string;
  pets: string;
  members: string;
  pets: string;
};

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

      <input
        {...register('name', {
          required: 'This field is required',
          minLength: {
            value: 3,
            message: 'Min length is 3 chars',
          },
        })}
      />
      {errors.name && <span className="err">{errors.name.message}</span>}

      <input type="date" {...register('date', { required: true })} />
      {errors.date && <span className="err">This field is required</span>}

      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        {...register('img', { required: 'This field is required' })}
      />
      {errors.img && <span className="err">{errors.img.message}</span>}

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
      {errors.pets && <span className="err">{errors.language.message}</span>}

      <button className="btn" type="submit">
        Add user
      </button>
      {showMessage ? <p>Card was added</p> : null}
    </form>
  );
};

export default AddCardForm;
