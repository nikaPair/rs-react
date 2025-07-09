import { Component, type ReactNode } from 'react';
interface ButtonProps {
  children: ReactNode;
  onClick: () => void
}
export default class Button extends Component<ButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
  }
}
