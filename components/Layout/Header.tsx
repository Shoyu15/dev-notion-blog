import Link from "next/link";
import React from "react";
import Logo from "./Logo";

export const Header = () => {
  return (
    <header className="container mx-auto mt-10 max-w-4xl">
      <nav className="container flex justify-between items-center">
        <Logo />
        <nav className="">
          <ul className="flex items-center text-sm [&>*:not(:first-child)]:ml-8">
            <li className="">
              <Link
                href="/"
                className="block text-lg hover:text-gray-200 transition-all duration-300"
              >
                TOP
              </Link>
            </li>
            <li className="">
              <Link
                href="/tips"
                className="block text-lg hover:text-gray-200 transition-all duration-300"
              >
                Tips
              </Link>
            </li>
            <li className="">
              <Link
                href="/about"
                className="block text-lg hover:text-gray-200 transition-all duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </nav>
    </header>
  );
};
