import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartIcon } from '@/components/CartIcon';

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Contact', to: '/contact' },
];

function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-gray-950 text-white'
      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-950',
  ].join(' ');
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <NavLink
          to="/"
          className="flex items-center gap-3 text-gray-950"
          onClick={() => setIsMenuOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-md bg-gray-950 text-sm font-bold text-white"
          >
            PC
          </span>
          <span className="text-lg font-semibold tracking-normal">
            Product Catalog
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <CartIcon />

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span aria-hidden="true" className="relative block size-5">
              <span
                className={[
                  'absolute left-0 top-1 block h-0.5 w-5 bg-current transition-transform',
                  isMenuOpen ? 'translate-y-1.5 rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-2.5 block h-0.5 w-5 bg-current transition-opacity',
                  isMenuOpen ? 'opacity-0' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-4 block h-0.5 w-5 bg-current transition-transform',
                  isMenuOpen ? '-translate-y-1.5 -rotate-45' : '',
                ].join(' ')}
              />
            </span>
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-gray-200 bg-white px-4 py-3 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={getNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
