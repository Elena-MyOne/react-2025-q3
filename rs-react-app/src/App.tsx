import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
// import Header from './components/Header';

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
          {/* <Header value={''} handleSearch={() => {}} /> */}
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
