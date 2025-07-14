import { Component } from 'react';
import type { ErrorInfo } from 'react';
import './error-boundary.css';
export default class ErrorBoundary extends Component<{
  children: React.ReactNode;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>{' '}
          <button
            className="error-boundary__button"
            onClick={() => window.location.reload()}
          >
            Go Back{' '}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
