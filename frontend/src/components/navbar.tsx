import React, { useState } from 'react';

// --- Type Definitions for TypeScript ---

// Tipe untuk data pengguna, bisa null jika belum login
type User = {
  name: string;
} | null;

// Tipe untuk props yang diterima oleh komponen Navbar
interface NavbarProps {
  user: User;
  logoUrl: string; // URL untuk logo
}

// --- Komponen Link Navigasi ---
// Untuk menghindari repetisi kode
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
    <a
        href={href}
        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xl font-medium leading-5 text-gray-50 hover:text-green-200 hover:border-green-200 focus:outline-none focus:text-green-200 focus:border-green-200 transition"
    >
        {children}
    </a>
);


// --- Komponen Utama Navbar ---
const Navbar: React.FC<NavbarProps> = ({ user, logoUrl }) => {
  return (
    <nav className="bg-green-800 w-full px-10 py-3 fixed top-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2 text-lg font-bold text-white">
            <img src={logoUrl} alt="Logo" className="h-[74px]" onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x74/166534/FFFFFF?text=Logo'; }} />
          </a>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden sm:flex space-x-8 uppercase">
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="/asuransi">Asuransi</NavLink>
          {/* Anda bisa menambahkan link lain di sini */}
        </div>

        {/* Auth Links (Desktop) */}
        <div className="hidden sm:flex sm:items-center sm:ms-6">
          {user ? (
            // Jika user sudah login
            <a
              href="/dashboard"
              className="px-4 py-2 bg-white text-green-800 rounded-md font-semibold text-sm hover:bg-gray-200 transition"
            >
              Dashboard
            </a>
          ) : (
            // Jika user belum login (guest)
            <div className="flex items-center gap-4">
              <a href="/login" className="text-sm text-white underline hover:text-green-200 transition">
                Log in
              </a>
              <a
                href="/register"
                className="inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-600 active:bg-green-800 focus:outline-none focus:border-green-800 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;