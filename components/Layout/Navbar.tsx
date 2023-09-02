import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-2/5">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-xl font-medium">
          SANKOU!
        </Link>
        <div>
          <ul className="flex items-center text-sm py-4">
            <li>
              <Link href="/" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">STUDIOで制作</Link>
            </li>
            <li>
              <Link href="/" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">スマホ特化</Link>
            </li>
            <li>
              <Link href="/" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">フォント版</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};