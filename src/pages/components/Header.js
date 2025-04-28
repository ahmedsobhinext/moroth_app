// components/Header.js
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { cartItems, showCart, toggleCart, closeCart } = useCart();
  const { user } = useAuth();

  return (
    <header className="bg-white p-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center space-x-4">
          <Image 
            src="/Logooo.PNG" 
            alt="Logo" 
            className="h-16 w-auto" 
            loading='lazy' 
            width={100} 
            height={100}
          />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        {/* Why Moroth */}
        <Link href="/about" className="font-IBMPlexSansArabic text-xl font-semibold text-yellow-500">
          لماذا موروث؟
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Link href="/" className="hover:text-amber-200">
              <button className="text-2xl text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          ) : (
            <Link href="/login/user" className="hover:text-amber-200">
              <button className="text-2xl text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          )}

          <Link href="/" className="text-2xl text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </Link>

          {/* Cart Button */}
          <div className="relative">
            <button 
              onClick={toggleCart}
              className="text-2xl text-green-700 relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            {showCart && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-IBMPlexSansArabic text-lg font-semibold">سلة التسوق</h3>
                    <button 
                      onClick={closeCart}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  {cartItems.length === 0 ? (
                    <p className="font-IBMPlexSansArabic text-gray-500 text-center">السلة فارغة</p>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between border-b pb-2">
                            <div className="flex-1">
                              <p className="font-IBMPlexSansArabic text-sm">{item.title}</p>
                              <p className="font-IBMPlexSansArabic text-xs text-gray-500">{item.price} ر.س</p>
                            </div>
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-12 h-12 object-cover rounded ml-2"
                            />
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/cart"
                        onClick={closeCart}
                        className="block mt-4 bg-green-700 text-white text-center py-2 rounded-lg font-IBMPlexSansArabic hover:bg-green-800"
                      >
                        عرض السلة
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;