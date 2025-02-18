import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Saudi Heritage</h1>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/heritage-site">Heritage Sites</Link>
          </li>
          <li>
            <Link href="/heritage-clothing">Heritage Clothing</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}