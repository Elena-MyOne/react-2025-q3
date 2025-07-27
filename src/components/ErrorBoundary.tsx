import React from 'react';
import { BiError } from 'react-icons/bi';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  isClichedErrorButton: boolean;
}

interface Props {
  hasError: boolean;
  error: string;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  Props
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('Error: ', errorInfo);
    console.log('Error: ', error);
    this.setState({ hasError: true, error: `${error}` });
  }

  render() {
    const { hasError, error } = this.state;
    const { isClichedErrorButton } = this.props;

    if (hasError || isClichedErrorButton) {
      return (
        <>
          <div className="flex justify-center items-center gap-8 p-4 bg-red-500">
            <span className="text-4xl">
              <BiError />
            </span>
            <div className="">
              <p>
                Error:{' '}
                {error?.toString() || 'The Error boundary button was triggered'}
              </p>
              <p>Please restart the page or try again later</p>
            </div>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
