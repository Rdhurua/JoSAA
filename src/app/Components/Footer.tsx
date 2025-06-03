import Link from 'next/link';

const Footer = () => {
  return (
  <footer className="w-full bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-t border-gray-300 py-10 mt-10">
  <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-16">

    {/* Left - Branding */}
    <div className="md:w-1/3 text-center md:text-left">
      <h3 className="text-2xl font-bold text-blue-800 mb-2">JoSAA Counselling Helper</h3>
      <p className="text-gray-700 mb-2">© {new Date().getFullYear()} All rights reserved.</p>
      <p className="text-gray-600 text-sm">
        Your trusted partner in JoSAA counselling, helping you make every mark count.
      </p>
    </div>

    {/* Middle - Quick Links */}
    <div className="md:w-1/3">
      <h4 className="text-lg font-semibold text-blue-800 mb-4 text-center md:text-center">Quick Links</h4>
      <nav className="flex flex-col items-center justify-between space-y-2 text-gray-700 text-center md:text-left">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <Link href="#about" className="hover:text-blue-600 transition">About</Link>
        <Link href="#how-it-works" className="hover:text-blue-600 transition">How It Works</Link>
      </nav>
    </div>

    {/* Right - Contact Info */}
    <div className="md:w-1/3 text-center md:text-justify">
      <h4 className="text-lg font-semibold text-blue-800 mb-4">Contact Us</h4>
      <p className="text-gray-700 mb-2">
        Email:<a href="mailto:josaacounsellinghelper@gmail.com" className="text-blue-600 hover:underline">josaacounsellinghelper@gmail.com</a>
      </p>
    </div>

  </div>
</footer>


  );
};

export default Footer;
