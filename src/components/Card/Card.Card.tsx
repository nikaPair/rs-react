import { Component } from 'react';
import './card.css';

interface CardComponentProps {
  name: string;
  url?: string;
  description: string;
}

export default class Card extends Component<CardComponentProps> {
  render() {
    return (
      <div className="card">
        {this.props.url && (
          <img
            src={this.props.url}
            alt={this.props.name}
            className="card__image"
          />
        )}
        <h2 className="card__title">{this.props.name}</h2>
        <p className="card__description">
          You can find more information about this pokemon on this link:{' '}
          <a
            className="card__link"
            href={this.props.description}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.description}
          </a>
        </p>
      </div>
    );
  }
}
