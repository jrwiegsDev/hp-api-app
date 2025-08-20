import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MagicCursorEffect from './MagicCursorEffect';

function Layout() {
  return (
    <div>
      <MagicCursorEffect /> {/* Add the effect here */}
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;