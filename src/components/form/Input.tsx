import React from 'react';
import './style.css';

type Props = {
  type: string;
  label: string;
  error: string;
};

const Input = React.forwardRef(
  ({ type, label, error }: Props, ref: React.Ref<HTMLInputElement>) => (
    <div>
      <label>{label}</label>
      <input type={type} ref={ref} />
      {error ? <p className="err">{error}</p> : null}
    </div>
  )
);

export default Input;
