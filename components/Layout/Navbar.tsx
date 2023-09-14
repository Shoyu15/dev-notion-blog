import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="container mx-auto">
      <div className="flex items-center justify-between mx-auto">
        <Link href="/" className="text-xl font-medium">
          Blog
        </Link>
        <div>
          <ul className="flex items-center text-sm py-4">
            <li>
              <Link href="/" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">TOP</Link>
            </li>
            <li>
              <Link href="/tips" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">Tips</Link>
            </li>
            <li>
              <Link href="/about" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
