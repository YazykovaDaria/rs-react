import React from 'react';
import './style.css';
import Input, { InputProps } from './Input';

type Values = {
  values: string[];
};

type Props = InputProps & Values;

const ChoiseInputs: React.FC<Props> = ({ label, name, type, register, rules, error, values }) => {
  return (
    <div className="form">
      <p>{label}</p>

      <fieldset>
        {values.map((value) => {
          const prop = { label, name, type, register, rules, value };
          return <Input {...prop} key={value}></Input>;
        })}
      </fieldset>
      {error && <span className="err">{String(error.message)}</span>}
    </div>
  );
};

export default ChoiseInputs;
