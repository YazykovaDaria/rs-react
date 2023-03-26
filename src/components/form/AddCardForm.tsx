import React from 'react';
import './style.css';
import Input from './Input';

const initStateErrors = {
  name: '',
  img: '',
  date: '',
  pets: '',
  members: '',
  language: '',
};

const getInputValues = (collection: NodeListOf<HTMLInputElement>, type: string): string[] => {
  const values: string[] = [];
  collection.forEach((el: HTMLInputElement) => {
    if (el.checked) {
      const value = type === 'radio' ? el.value : el.name;
      values.push(value);
    }
  });
  return values;
};

class AddCardForm extends React.Component {
  constructor(props) {
    super(props);

    this.img = React.createRef();
    this.date = React.createRef();
    this.name = React.createRef();
    this.radio = React.createRef();
    this.checkbox = React.createRef();
    this.select = React.createRef();
    this.state = initStateErrors;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const name = this.name.current.value;
    const file = this.img.current.files[0];
    const img = file ? URL.createObjectURL(file) : '';
    const date = this.date.current.value;
    const pets = getInputValues(this.radio.current.childNodes, 'radio');
    const members = getInputValues(this.checkbox.current.childNodes, 'checkbox');
    const language = this.select.current.value;

    const isValid = this.handleValidation({ name, date, img, pets, members, language });

    // if (isValid) {
    //   console.log(`data - ${name} ${date}`);
    //   this.setState(initStateErrors);
    //   event.target.reset();
    // }
  };

  setError(key, message) {
    this.setState({
      [key]: message,
    });
  }

  handleValidation = (data): boolean => {
    let flag = true;
    const entries = Object.entries(data);
    //console.log(entries);

    entries.forEach(([key, val]) => {
      //console.log(val.length);

      if (val.length > 0) {
        if (key === 'name') {
          const char = val.charAt(0);
          flag = char.toUpperCase() === char;
          const message = flag ? '' : 'be big';
          this.setError(key, message);
        } else {
          flag = true;
          this.setError(key, '');
        }
      } else {
        this.setError(key, 'requaried');
        flag = false;
      }
    });

    return flag;
  };

  render() {
    return (
      <div>
        <h2 className="title">Add user card</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <Input ref={this.name} label="Name" type="text" error={this.state.name}></Input>
          <Input ref={this.date} label="Date of Birth" type="date" error={this.state.date}></Input>
          <Input ref={this.img} label="Avatar" type="file" error={this.state.img}></Input>

          <fieldset ref={this.radio}>
            <p className="form-title">Is cats cool?</p>
            <input type="radio" id="html" name="language" value="yes"></input>
            <label htmlFor="html">yes</label>
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
