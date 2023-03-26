import React from 'react';
import './style.css';
import Input from './Input';

const initStateErrors = {
  name: '',
  img: '',
  date: '',
  pets: '',
};

const getInputValues = (collection: NodeListOf<HTMLInputElement>): string[] => {
  const values: string[] = [];
  collection.forEach((el: HTMLInputElement) => {
    if (el.checked) {
      values.push(el.value);
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
    this.state = initStateErrors;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const name = this.name.current.value;
    const file = this.img.current.files[0];
    const img = file ? URL.createObjectURL(file) : '';
    const date = this.date.current.value;
    const pets = getInputValues(this.radio.current.childNodes);
    console.log(pets);

    const isValid = this.handleValidation({ name, date, img, pets });

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
        <h2>Add card</h2>
        <form onSubmit={this.handleSubmit}>
          <Input ref={this.name} label="Name" type="text" error={this.state.name}></Input>
          <Input ref={this.date} label="Date" type="date" error={this.state.date}></Input>
          <Input ref={this.img} label="Avatar" type="file" error={this.state.img}></Input>

          <fieldset ref={this.radio}>
            <p>Choose your favorite pets</p>
            <input type="radio" id="html" name="language" value="cat"></input>
            <label htmlFor="html">cat</label>
            <input type="radio" id="css" name="language" value="dog"></input>
            <label htmlFor="css">dog</label>
            {this.state.pets ? <p className="err">{this.state.pets}</p> : null}
          </fieldset>

          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCardForm;
