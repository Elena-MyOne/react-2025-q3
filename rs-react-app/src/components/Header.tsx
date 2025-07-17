import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { LOCAL_STORAGE_VALUE } from '../consts';

interface HeaderProps {
  value: string;
  handleSearch(): Promise<void>;
}

export default class Header extends React.Component<
  HeaderProps,
  { value: string }
> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      value: props.value || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleSearchForm = this.handleSearchForm.bind(this);
  }

  componentDidMount(): void {
    const savedValue = localStorage.getItem(LOCAL_STORAGE_VALUE) || '';
    this.setState({ value: savedValue });
  }

  handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.currentTarget.value;
    this.setState({ value: target });
  }

  handleSearchButton(): void {
    const { value } = this.state;
    localStorage.setItem(LOCAL_STORAGE_VALUE, value);
  }

  handleSearchForm(event: React.FormEvent) {
    event.preventDefault();
    const { handleSearch } = this.props;
    this.handleSearchButton();
    handleSearch();
  }

  render() {
    const { value } = this.state;

    return (
      <header className="flex m-auto gap-4 border-b border-gray-200 p-0 py-4 md:container justify-between items-center">
        <div className="font-bold text-primary text-xl text-green-500">
          Rick And Morty
        </div>
        <form onSubmit={this.handleSearchForm} data-testid="search-form">
          <div className="flex items-center">
            <input
              type="text"
              className="grow border-gray-300 border-[1px] p-2"
              placeholder="Search..."
              value={value}
              onChange={this.handleChange}
            />
            <button
              className="text-2xl cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 duration-300 p-2"
              onClick={this.handleSearchButton}
            >
              <CiSearch />
            </button>
          </div>
        </form>
      </header>
    );
  }
}
