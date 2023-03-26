import React from 'react';
import './style.css';
import { User } from 'src/types.ts/card';
import Input from './Input';

type CardError = {
  name: string;
  img: string;
  date: string;
  pets: string;
  members: string;
  language: string;
};

interface IProps {
  addCard: (newCard: User) => void;
}

const initStateErrors: CardError = {
  name: '',
  img: '',
  date: '',
  pets: '',
  members: '',
  language: '',
};

const getInputValues = (collection: NodeListOf<ChildNode>, type: string): string[] => {
  const values: string[] = [];
  collection.forEach((el) => {
    if (el instanceof HTMLInputElement) {
      if (el.checked) {
        const value = type === 'radio' ? el.value : el.name;
        values.push(value);
      }
    }
  });
  return values;
};

class AddCardForm extends React.Component<IProps, CardError> {
  private img = React.createRef<HTMLInputElement>();
  private date = React.createRef<HTMLInputElement>();
  private name = React.createRef<HTMLInputElement>();
  private radio = React.createRef<HTMLFieldSetElement>();
  private checkbox = React.createRef<HTMLFieldSetElement>();
  private select = React.createRef<HTMLSelectElement>();

  constructor(props: IProps) {
    super(props);
    this.state = initStateErrors;
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = this.name.current!.value;
    const file = this.img.current!.files![0];
    const img = file ? URL.createObjectURL(file) : '';
    const date = this.date.current!.value;
    const pets = getInputValues(this.radio.current!.childNodes, 'radio');
    const members = getInputValues(this.checkbox.current!.childNodes, 'checkbox');
    const language = this.select.current!.value;

    const newCard = { name, date, img, pets, language, members };
    this.handleValidation(newCard);
    const isValid = this.handleValidation(newCard);
    console.log(isValid);

    if (isValid) {
      this.props.addCard(newCard);
      this.setState(initStateErrors);
      event.currentTarget.reset();
      alert('Card was added');
    }
  };

  setError(key: keyof CardError, message: string) {
    this.setState({
      [key]: message,
    } as Pick<CardError, keyof CardError>);
  }

  handleValidation = (data: User): boolean => {
    const entries: [string, string[] | string][] = Object.entries(data);
    const errors: string[] = [];

    entries.forEach(([stringKey, val]) => {
      const key = stringKey as keyof CardError;
      if (val.length > 0) {
        if (key === 'name' && typeof val === 'string') {
          const char = val.charAt(0);
          const message =
            char.toUpperCase() === char ? '' : 'name must start with a capital letter';
          this.setError(key, message);
          errors.push(message);
        } else {
          this.setError(key, '');
        }
      } else {
        this.setError(key, 'requaried');
        errors.push('err');
      }
    });
    const isValid = errors.filter((val) => val !== '');
    return isValid.length < 1;
  };

  render() {
    return (
      <div data-testid="add-card-form">
        <h2 className="title">Add user card</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <Input ref={this.name} label="Name" type="text" error={this.state.name}></Input>
          <Input ref={this.date} label="Date of Birth" type="date" error={this.state.date}></Input>
          <Input ref={this.img} label="Avatar" type="file" error={this.state.img}></Input>

          <fieldset ref={this.radio}>
            <p className="form-title">Is cats cool?</p>
            <input type="radio" id="html" name="language" value="of course"></input>
            <label htmlFor="html">of course</label>
            <input type="radio" id="css" name="language" value="absolutely"></input>
            <label htmlFor="css">absolutely</label>
            {this.state.pets ? <p className="err">{this.state.pets}</p> : null}
          </fieldset>

          <fieldset ref={this.checkbox}>
            <p className="form-title">Choose your favorite BLACKPINK members:</p>

            <input type="checkbox" id="scales" name="Lisa" />
            <label htmlFor="scales">Lisa</label>

            <input type="checkbox" id="h" name="Jisoo" />
            <label htmlFor="h">Jisoo</label>

            <input type="checkbox" id="horns" name="Jennie" />
            <label htmlFor="horns">Jennie</label>

            <input type="checkbox" id="hor" name="Rose" />
            <label htmlFor="hor">Rose</label>

            {this.state.members ? <p className="err">{this.state.members}</p> : null}
          </fieldset>

          <fieldset>
            <p className="form-title">Select the best programming language</p>
            <select ref={this.select} className={this.state.language ? 'err' : ''}>
              <option value="java script">java script</option>
              <option value="type script">type script</option>
              <option value="coffee script">coffee script</option>
            </select>
            {this.state.language ? <p className="err">{this.state.language}</p> : null}
          </fieldset>

          <div>
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCardForm;
