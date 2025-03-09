import Link from 'next/link';

const Footer = () => (
  <footer className="bg-amber-900 text-white mt-12 py-8">
    <div className="container mx-auto text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <Link href="/contact" className="hover:text-amber-200">
          Contact
        </Link>
        <Link href="/" className="hover:text-amber-200">
          Privacy Policy
        </Link>
        {/* <Link href="/register/event-manager" className="hover:text-amber-200">
          Event Manager Registration
        </Link> */}
        <Link href="/login/event-manager" className="hover:text-amber-200">
          Event Manager Login
        </Link>
        <Link href="/login/designer" className="hover:text-amber-200">
        Designer Login
        </Link>
        <Link href="/login/admin" className="hover:text-amber-200">
        Admin Login
        </Link>
      </div>
      <p className="mt-4">© 2025</p>
    </div>
  </footer>
);

export default Footer;