// src/components/Layout.jsx
import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

import AppNavbar from './NavBar';
import AppSidebar from './SideBar';
import AppFooter from './Footer';
import Breadcrumbs from './BreadCrumbs';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  const showSidebar = pathname === '/organizer' || pathname === '/dashboard';
  const authRoutes = ['/login', '/register'];
  const isAuthPage = authRoutes.some(route => pathname.startsWith(route));
  const showNavbar = !isAuthPage;
  const showFooter = !isAuthPage;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {showNavbar && <AppNavbar onMenuClick={() => setSidebarOpen(o => !o)} />}

      <div className="flex flex-1 w-full max-w-screen overflow-x-hidden">
        {showSidebar && (
          <div className="hidden md:block w-64 bg-white shadow-md border-r">
            <AppSidebar />
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {showNavbar && <Breadcrumbs />}
          <Outlet />
        </main>
      </div>

      {showFooter && <AppFooter />}
    </div>
  );
}
