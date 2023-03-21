import React from 'react';
import Input from './Input';

class AddCardForm extends React.Component {
  constructor(props) {
    super(props);

    this.img = React.createRef();
    this.date = React.createRef();
    this.name = React.createRef();
    this.state = {
      errors: {
        name: '',
        img: '',
        date: '',
      },
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const name = this.name.current.value;
    const file = this.img.current.files[0];
    const img = file ? URL.createObjectURL(file) : '';
    const date = this.date.current.value;
    const isValid = this.handleValidation({ name, date, img });
    //console.log(this.state.errors);

    if (isValid) {
      alert(`data - ${name} ${date}`);
    }
  };

  //валидируется только 1 поле
  handleValidation = (data): boolean => {
    let flag = true;
    const entries = Object.entries(data);
    //console.log(entries);

    entries.forEach(([key, val]) => {
      if (val.length < 1) {
        flag = false;
        this.setState({ errors: { ...this.state.errors, [key]: 'requaried' } });
      }
      if (key === 'name') {
        const char = val.charAt(0);
        if (char.toUpperCase() !== char) {
          flag = false;
          this.setState({ errors: { ...this.state.errors, [key]: 'must be big' } });
        }
      }
    });
    console.log(this.state.errors);

    return flag;
  };

  render() {
    return (
      <div>
        <h2>Add card</h2>
        <form onSubmit={this.handleSubmit}>
          <Input ref={this.name} label="Name" type="text" error={this.state.errors.name}></Input>
          <Input ref={this.date} label="Date" type="date" error={this.state.errors.date}></Input>
          <Input ref={this.img} label="Avatar" type="file" error={this.state.errors.img}></Input>

          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCardForm;
