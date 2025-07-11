import React from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

interface AppProps {
  isLoading: boolean;
  isClichedErrorButton: boolean;
}
export default class App extends React.Component<object, AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isLoading: false,
      isClichedErrorButton: false,
    };

    this.throwError = this.throwError.bind(this);
  }

  throwError() {
    this.setState({
      isClichedErrorButton: true,
    });
    console.error('Error: The Error boundary button was triggered');
  }

  render() {
    const { isClichedErrorButton } = this.state;

    return (
      <>
        <ErrorBoundary isClichedErrorButton={isClichedErrorButton}>
          Hello
          <button
            className="bg-green-400 hover:bg-green-500 py-2 px-4 duration-300"
            onClick={this.throwError}
          >
            ErrorBoundary
          </button>
        </ErrorBoundary>
      </>
    );
  }
}
