import { Outlet } from 'react-router-dom';
import Header from './Header';
import image from '../assets/1.jpg';
import imageDarck from '../assets/2.jpg';
import { useTheme } from '../hooks/useTheme';
import { THEME } from '../consts';

interface LayoutProps {
  value: string;
  handleSearch(): Promise<void>;
}

export default function Layout({ value, handleSearch }: LayoutProps) {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <Header value={value} handleSearch={handleSearch} />
      <div
        className="min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[length:100%_auto]"
        style={{
          backgroundImage:
            theme === THEME.LIGHT ? `url(${image})` : `url(${imageDarck})`,
        }}
      >
        <main className="m-auto px-0 py-6 md:container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
