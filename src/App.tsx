import { Component, type ChangeEvent } from 'react';
import './app.css';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import CardList from './components/CardList/CardList';
import NotFound from './components/NotFound/NotFound';
import { pokemonService } from './services/pokemonService';
import { localStorageService } from './utils/localStorageService';

export interface PokemonProps {
  name: string;
  url: string;
  id?: string;
  sprites?: {
    front_default: string;
  };
}

interface StateType {
  inputValue: string;
  Item: PokemonProps[];
  isLoading: boolean;
  notFound: boolean;
  shouldThrowError: boolean;
}

export default class App extends Component {
  state: StateType = {
    inputValue: this.getSavedSearchTerm(),
    Item: [],
    isLoading: false,
    notFound: false,
    shouldThrowError: false,
  };

  getSavedSearchTerm(): string {
    return localStorageService.getSearchTerm();
  }

  saveSearchTerm(term: string) {
    localStorageService.setSearchTerm(term);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchApi();
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  fetchApi = async () => {
    const { inputValue } = this.state;

    this.setState({ isLoading: true, notFound: false });
    try {
      const pokemonData = await pokemonService.fetchPokemon(inputValue);
      this.setState({ Item: pokemonData, isLoading: false, notFound: false });
      this.saveSearchTerm(inputValue);
    } catch (err) {
      console.error('Ошибка:', err);
      this.setState({
        Item: [],
        isLoading: false,
        notFound: err instanceof Error && err.message.includes('not found'),
      });
    }
  };

  render() {
    if (this.state.shouldThrowError) {
      throw new Error('404');
    }

    return (
      <>
        <div className="main">
          <div className="search-container">
            <Input
              onChange={this.handleInputChange}
              value={this.state.inputValue}
            />
            <Button onClick={this.fetchApi}>Search</Button>
          </div>
        </div>
        <CardList items={this.state.Item} isLoading={this.state.isLoading} />
        {this.state.notFound && <NotFound />}
        <button
          onClick={() => {
            this.setState({ shouldThrowError: true });
          }}
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            zIndex: 1000,
            backgroundColor: 'red',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          Error
        </button>
      </>
    );
  }
}
