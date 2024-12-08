import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.jpg';

const navigationItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/menu', label: 'Menu' },
  { path: '/reservations', label: 'Reservations' },
  { path: '/order-online', label: 'Order Online' },
  { path: '/login', label: 'Login' },
];

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkStyles = (path) => {
    const baseStyles =
      'font-secondary font-medium transition-all hover:border-b-[3px] hover:border-[#6D9773] pb-1';
    return `${baseStyles} ${
      location.pathname === path ? 'border-b-[3px] border-[#6D9773]' : ''
    }`;
  };

  return (
    <nav className="font-secondary container mx-auto py-3" {...props}>
      <div className="relative flex items-center justify-between">
        <div>
          <Link to="/">
            <img src={logo} alt="logo little lemon" width={200} />
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          className="z-50 rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? 'close menu' : 'open menu'}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop menu */}
        <ul className="hidden flex-row items-center gap-4 md:flex">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link className={getLinkStyles(item.path)} to={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={toggleMenu}
        />
        <div
          className={`fixed right-0 top-0 z-40 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6">
            <ul className="flex flex-col gap-6 pt-16">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    className={`font-inter text-lg ${getLinkStyles(item.path)}`}
                    to={item.path}
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
