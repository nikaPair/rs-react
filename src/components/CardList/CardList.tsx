import { Component } from 'react';
import Card from '../Card/Card';
import './cardList.css';
import { type PokemonProps } from '../../App';
import Loader from '../Loader/Loaer';
interface CardListProps {
  items: PokemonProps[];
  isLoading: boolean;
}

class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="card-list">
        {this.props.isLoading ? (
          <Loader />
        ) : (
          this.props.items.map((item) => {
            return (
              <Card
                key={item.name}
                name={item.name}
                url={item.sprites?.front_default}
                description={item.url}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default CardList;
