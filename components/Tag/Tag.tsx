import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

export const Tag = (props: Props) => {
  const { tags } = props;

  return (
    <section className="background-white-100 mx-auto mt-16">
      <div className="flex flex-wrap gap-3">
        {tags.map((tag: string, index: number) => (
          <Link
            href={`/tag/${tag}/1`}
            key={index}
            className="border-my-color-dark border rounded-lg flex items-center justify-center px-4 py-1"
          >
            <span className="text-my-color-dark">{tag}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
