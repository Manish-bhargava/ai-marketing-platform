import React, { useState } from 'react';
import { Menu, X, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/80">
      <nav className="container mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        
        {/* Logo */}
        <a onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <img src="./logo5.png" height={100} width={100} />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">AMS</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          {isAuthenticated ? (
            <button onClick={onLogout} className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
              Logout
            </button>
          ) : (
            <button onClick={() => navigate('/login')} className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
              Login
            </button>
          )}

          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
            className="group inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-indigo-700 transition-all duration-300"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
            <MoveRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="rounded-md p-2 text-gray-700 dark:text-gray-200">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-full max-w-xs bg-white p-6 shadow-xl dark:bg-gray-950" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <a onClick={() => { navigate('/'); setIsMenuOpen(false); }} className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer">AMS</a>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-700 dark:text-gray-200">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-y-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
              <button
                onClick={() => { navigate(isAuthenticated ? '/dashboard' : '/login'); setIsMenuOpen(false); }}
                className="block w-full rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              </button>

              {isAuthenticated ? (
                <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="mt-4 block w-full rounded-full py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  Logout
                </button>
              ) : (
                <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="mt-4 block w-full rounded-full py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
