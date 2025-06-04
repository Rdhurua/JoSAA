import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
 <footer className="bg-zinc-900 border-t border-gray-200 mt-16">
  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-start">

    <div className="flex flex-row items-center md:items-start gap-x-4">
      <Image
        src="/logof.png"
        alt="JoSAA Counselling Helper Logo"
        width={80}
        height={80}
        className="rounded-full border-2 border-blue-100"
      />
      <div>
        <h3 className="text-md  md:text-lg font-extrabold text-gray-200 tracking-tight">
          JoSAA Counselling Helper
        </h3>
        <p className="text-sm sm:text-base text-gray-400 mt-1">
          Your trusted partner in JoSAA counselling.
        </p>
      </div>
    </div>

    {/* Quick Links */}
    <div className="flex flex-col items-center ">
      <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-4">Quick Links</h4>
      <nav className="space-y-2 space-x-3 text-sm sm:text-base text-gray-400">
        <Link href="/" className="hover:text-blue-500 transition-all duration-200">Home</Link>
        <Link href="#about" className="hover:text-blue-500 transition-all duration-200">About</Link>
        <Link href="#how-it-works" className="hover:text-blue-500 transition-all duration-200">How It Works</Link>
      </nav>
    </div>

    {/* Contact Info */}
    <div className="flex flex-col items-center md:items-end text-center md:text-right">
      <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-4">Contact Us</h4>
      <p className="text-sm sm:text-base text-gray-300">
        Email:{" "}
        <a href="mailto:josaacounsellinghelper@gmail.com" className="text-blue-500 hover:underline">
          josaacounsellinghelper@gmail.com
        </a>
      </p>
      <p className="text-sm sm:text-base text-gray-400 mt-2">
        We respond within 12 hours on working days.
      </p>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="bg-zinc-900 border-t border-gray-300 py-4 text-center text-sm sm:text-base text-gray-400">
    © {new Date().getFullYear()} <strong className="text-gray-200">JoSAA Counselling Helper</strong>. All rights reserved.
  </div>
</footer>




  );
};

export default Footer;
