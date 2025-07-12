import { Component } from 'react';
import './card.css';
import { type PokemonProps } from '../../App';
export default class Card extends Component<PokemonProps> {
  render() {
    return (
      <div className="card">
        <h2 className="card__title">{this.props.name}</h2>
        <p className="card__description">
          You can find more information about this pokemon on this link:{' '}
          <a
            className="card__link"
            href={this.props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.url}
          </a>
        </p>
      </div>
    );
  }
}
