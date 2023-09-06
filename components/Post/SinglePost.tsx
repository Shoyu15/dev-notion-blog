import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[]; //stringの配列型らしい
  slug: string;
  isPaginationPage: boolean;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPaginationPage } = props;
  return (
    <>
      {isPaginationPage ? (
        <article className="bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="lg:flex items-center gap-3">
            <Link href={`/posts/${slug}`}>
              <h2 className="text-gray-100 text-2xl font-medium mb-2">
                {title}
              </h2>
            </Link>
            <div className="text-gray-100">{date}</div>
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-gray-100 bg-gray-500 rounded-md px-2 pb-1 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </article>
      ) : (
        <article className="lg:w-1/2 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3">
            <Link href={`/posts/${slug}`}>
              <h2 className="text-gray-100 text-2xl font-medium mb-2">
                {title}
              </h2>
            </Link>
            <div className="text-gray-100">{date}</div>
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-gray-100 bg-gray-500 rounded-md px-2 pb-1 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </article>
      )}
    </>
  );
};

export default SinglePost;
