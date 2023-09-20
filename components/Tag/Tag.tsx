import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

export const Tag = (props: Props) => {
  const { tags } = props;

  return (
    <div className="mx-auto">
      <span className="text-gray-300">Category</span>
      <ul className="flex flex-wrap mt-6 [&>*:not(:first-child)]:ml-2">
      <li className="border-my-color-white border rounded-2xl text-my-color-white flex items-center justify-center px-4 py-1 font-normal text-sm ease-in-out duration-300 hover:bg-my-color-white hover:text-my-color-dark">
        <Link href="/tips">All</Link>
      </li>
        {tags.map((tag: string, index: number) => (
          <li key={index}>
            <Link
              href={`/tag/${tag}`}
              className="border-my-color-white border rounded-2xl text-my-color-white flex items-center justify-center px-4 py-1 font-normal text-sm ease-in-out duration-300 hover:bg-my-color-white hover:text-my-color-dark"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
