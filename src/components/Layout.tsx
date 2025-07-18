import { Outlet } from 'react-router-dom';
import Header from './Header';
import image from '../assets/rick-and-morty-wallpaper.jpg';

interface LayoutProps {
  value: string;
  handleSearch(): Promise<void>;
}

export default function Layout({ value, handleSearch }: LayoutProps) {
  return (
    <div className="bg-white">
      <Header value={value} handleSearch={handleSearch} />
      <div
        className="min-h-screen bg-contain bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <main className="m-auto px-0 py-6 md:container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
