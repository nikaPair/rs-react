import { Component, type ChangeEvent } from 'react';
import './input.css';
interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
export default class Input extends Component<InputProps> {
  render() {
    return (
      <input
        type="text"
        className="search__input"
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder="Search for a pokemon..."
      />
    );
  }
}
