import React from 'react';
import Input from './Input';

const initStateErrors = {
  name: '',
  img: '',
  date: '',
};

class AddCardForm extends React.Component {
  constructor(props) {
    super(props);

    this.img = React.createRef();
    this.date = React.createRef();
    this.name = React.createRef();
    this.state = initStateErrors;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const name = this.name.current.value;
    const file = this.img.current.files[0];
    const img = file ? URL.createObjectURL(file) : '';
    const date = this.date.current.value;
    const isValid = this.handleValidation({ name, date, img });

    if (isValid) {
      console.log(`data - ${name} ${date}`);
      this.setState(initStateErrors);
      event.target.reset();
    }
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

          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCardForm;
