// components/NavMenu.js

import Link from 'next/link';

const NavMenu = () => {
  return (
    <nav className="bg-white p-4 flex justify-center space-x-8">
      {/* Navigation Links */}
      <Link href="/heritage-places" className="font-IBMPlexSansArabic text-xl font-semibold text-green-700 hover:text-yellow-500">
        الأماكن التراثية
      </Link>
      <Link href="/clothing" className="font-IBMPlexSansArabic text-xl font-semibold text-green-700 hover:text-yellow-500">
        الأزياء
      </Link>
      <Link href="/popular-dishes" className="font-IBMPlexSansArabic text-xl font-semibold text-green-700 hover:text-yellow-500">
        الأكلات الشعبية
      </Link>
      <Link href="/cultural-events" className="font-IBMPlexSansArabic text-xl font-semibold text-green-700 hover:text-yellow-500">
        الفعاليات الثقافية
      </Link>
    </nav>
  );
};

export default NavMenu;