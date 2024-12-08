import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Footer = () => {
  const importantLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/menu', label: 'Menu' },
    { to: '/reservations', label: 'Reservations' },
    { to: '/order-online', label: 'Order Online' },
    { to: '/login', label: 'Login' },
  ];

  const socialLinks = [
    { label: 'Facebook', url: 'https://facebook.com' },
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'Twitter', url: 'https://twitter.com' },
  ];

  return (
    <footer className="bg-white py-16 shadow-inner">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4">
        {/* Logo y descripción */}
        <div className="flex flex-col gap-4">
          <img src={logo} alt="Little Lemon" className="w-32" />
          <p className="text-sm text-gray-600">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Important Links</h3>
          <ul className="flex flex-col gap-2">
            {importantLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-gray-600 transition-colors hover:text-[#495E57]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Contact</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <strong>Address:</strong>
              <p>123 Town Street, Chicago</p>
            </li>
            <li>
              <strong>Phone:</strong>
              <p>+00 123 456 789</p>
            </li>
            <li>
              <strong>Email:</strong>
              <p>little@lemon.com</p>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Social Media Links</h3>
          <ul className="flex flex-col gap-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-[#495E57]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
