import React from 'react';
import './style.css';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: { message: string };
  accept?: string;
}

const Input: React.FC<Props> = ({
  label,
  name,
  type = 'text',
  accept = '',
  register,
  rules,
  error,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type={type} {...register(name, rules)} accept={accept} />
      {error && <span className="err">{error.message}</span>}
    </>
  );
};

export default Input;
