import { Component, type ReactNode } from 'react';
import './button.css';
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}
export default class Button extends Component<ButtonProps> {
  render() {
    return (
      <button onClick={this.props.onClick} className="button-5">
        {this.props.children}
      </button>
    );
  }
}
