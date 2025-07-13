import React from 'react';
import { BiError } from 'react-icons/bi';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  isClichedErrorButton: boolean;
}

interface Props {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  Props
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('Error: ', error);
    console.log('Error info: ', errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { isClichedErrorButton } = this.props;

    if (hasError || isClichedErrorButton) {
      return (
        <>
          <div className="flex justify-center items-center p-4 bg-red-500">
            <span className="text-xl">
              <BiError />
            </span>
            <p>Error occurred. Please restart the page or try again later</p>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
