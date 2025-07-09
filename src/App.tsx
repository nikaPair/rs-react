import { Component, type ChangeEvent } from 'react';
import './app.css';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
interface PokemonProps {
  name: string;
  url: string;
}
interface StateType {
  inputValue: string;
  Item: PokemonProps[];
}
export default class App extends Component {
  state: StateType = {
    inputValue: '',
    Item: [],
  };
  componentDidMount() {
    this.fetchApi();
  }
  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value,
    });
  };
  fetchApi = () => {
    const { inputValue } = this.state;
    const url =
      inputValue === ''
        ? 'https://pokeapi.co/api/v2/pokemon?limit=10'
        : `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not found');
        }
        return res.json();
      })
      .then((res) => {
        if (res.results) {
          this.setState({ Item: res.results });
        } else {
          this.setState({
            Item: [
              {
                name: res.name,
                url: `https://pokeapi.co/api/v2/pokemon/${res.id}`,
              },
            ],
          });
        }
      })
      .catch((err) => {
        console.error('Ошибка:', err);
        this.setState({ Item: [] });
      });
  };

  render() {
    console.log(this.state.Item)
    return (
      <div className="main">
        <div className="search-container">
          <Input
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          />
          <Button onClick={this.fetchApi}>Search</Button>
        </div>
      </div>
    );
  }
}
