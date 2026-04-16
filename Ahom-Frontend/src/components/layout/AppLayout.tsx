import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import DesktopSidebar from './DesktopSidebar';
import Toast from '../common/Toast';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white md:flex">
      <DesktopSidebar />
      <Toast />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto md:px-8 lg:px-12">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
