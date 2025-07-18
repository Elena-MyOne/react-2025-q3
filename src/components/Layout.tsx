import { Outlet } from 'react-router-dom';
import Header from './Header';
import image from '../assets/1.jpg';

interface LayoutProps {
  value: string;
  handleSearch(): Promise<void>;
}

export default function Layout({ value, handleSearch }: LayoutProps) {
  return (
    <div className="bg-white">
      <Header value={value} handleSearch={handleSearch} />
      <div
        className="min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[length:100%_auto]"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <main className="m-auto px-0 py-6 md:container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
