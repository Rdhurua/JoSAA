'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Auto-close mobile menu on resize to md or larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b-2 border-black md:border-none">
      <div className="flex justify-between h-20 items-center">
  {/* Left: Logo */}
  <div className="flex-1">
    <Link href="/" className="block">
      <Image src="/logo.png" alt="Logo" className="h-20 sm:h-28 w-auto" />
    </Link>
  </div>

  {/* Center/Right: Desktop Nav */}
  <div className="hidden md:flex space-x-6">
    <NavLinks />
  </div>

  {/* Right: Mobile Toggle */}
  <div className="md:hidden">
    <button onClick={toggleMenu} aria-label="Toggle menu">
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  </div>
</div>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col items-center justify-center bg-gray-200 px-4 py-4 space-y-4 md:hidden transition-all duration-300">
          <NavLinks closeMenu={closeMenu} />
        </div>
      )}
    </nav>
  );
};

interface NavLinksProps {
  closeMenu?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ closeMenu }) => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={closeMenu}
          className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors"
        >
          {label}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
