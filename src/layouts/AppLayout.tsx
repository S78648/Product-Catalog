import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-950">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
