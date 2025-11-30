import { Link, Outlet } from 'react-router';
import viteLogo from '/vite.svg';

export default function Layout() {
  return (
    <>
      <header>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-lg">
            <img src={viteLogo} alt="Vite Logo" />
            NDI
          </div>
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="p-4 text-center text-xs">
        <p>© 2025 Team SenSaaSionnel</p>
      </footer>
    </>
  );
}
