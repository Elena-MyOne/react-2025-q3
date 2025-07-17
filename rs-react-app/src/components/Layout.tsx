import { Outlet } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  value: string;
  handleSearch(): Promise<void>;
}

export default function Layout({ value, handleSearch }: LayoutProps) {
  return (
    <>
      <Header value={value} handleSearch={handleSearch} />
      <main className="m-auto px-0 py-6 md:container">
        <Outlet />
      </main>
    </>
  );
}
