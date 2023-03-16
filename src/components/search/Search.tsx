import React from 'react';

interface IProps {
  value: string;
}

interface IState {
  value: string;
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillUnmount() {
    const { value } = this.state;
    localStorage.setItem('search', value);
  }

  onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <form>
        <input type="search" value={value} onChange={this.onValueChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
