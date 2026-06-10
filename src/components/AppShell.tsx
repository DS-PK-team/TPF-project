import { Outlet, useLocation } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';

export default function AppShell() {
  const location = useLocation();
  const path = location.pathname;

  // Shell visibility rules:
  // 1. Ekrany linearne: brak pasków nawigacji na / oraz /success
  const isNoNavRoute = path === '/' || path === '/success';

  // 2. Ekrany pośrednie: SideNavBar obecny, ale brak TopNavBar na /processing (skupienie na animacji)
  const isProcessingRoute = path === '/processing';

  if (isNoNavRoute) {
    return (
      <main className="min-h-screen bg-background">
        <Outlet />
      </main>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* SideNavBar jest widoczny na wszystkich pozostałych ekranach */}
      <SideNavBar />

      {/* Główny obszar zawartości */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* TopNavBar jest ukryty na ekranie /processing, ale widoczny wszędzie indziej */}
        {!isProcessingRoute && <TopNavBar />}

        {/* Przewijalny obszar renderowania widoków */}
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
