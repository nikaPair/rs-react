import { Component, type ChangeEvent } from 'react';
interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string
}
export default class Input extends Component<InputProps> {
  render() {
    return <input type="text" className="search-input" value={this.props.value} onChange={this.props.onChange}/>;
  }
}
