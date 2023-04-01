import React from 'react';
import './style.css';
import {
  RegisterOptions,
  UseFormRegister,
  FieldError,
  FieldValues,
  FieldErrors,
} from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  error?: FieldError | FieldErrors;
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
      {error && <span className="err">{String(error.message)}</span>}
    </>
  );
};

export default Input;
