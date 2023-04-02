import React from 'react';
import './style.css';
import {
  RegisterOptions,
  UseFormRegister,
  FieldError,
  FieldValues,
  FieldErrors,
} from 'react-hook-form';

export type InputProps = {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  error?: FieldError | FieldErrors;
  value?: string;
  accept?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  accept = '',
  register,
  rules,
  error,
  value,
}) => {
  if (type === 'checkbox' || type === 'radio') {
    return (
      <>
        <input type={type} {...register(name, rules)} value={value} id={name} />
        <label htmlFor={name}>{value}</label>
      </>
    );
  }
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type={type} {...register(name, rules)} accept={accept} id={name} />
      {error && <span className="err">{String(error.message)}</span>}
    </>
  );
};

export default Input;
