import Link from "next/link";
import React from "react";

interface Props {
  numberOfPage: number;
}

export const Pagination = (props: Props) => {
  const { numberOfPage } = props;

  let pages: number[] = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((page) => (
          <li
            key={page}
            className="bg-sky-900 rounded-lg w-6 h-8 flex items-center justify-center"
          >
            <Link href={`/posts/page/${page}`} className="text-xs text-gray-100">
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
