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
        <article className="mb-8 mx-auto rounded-md p-5 ">
          <div className="lg:flex items-center gap-3">
            <Link href={`/posts/${slug}`}>
              <h2 className=" text-2xl font-medium mb-2">{title}</h2>
            </Link>
            <div className="">{date}</div>
            {tags.map((tag: string, index: number) => (
              <Link
                href={`/posts/tag/${tag}/page/1`}
                key={index}
                className=" bg-gray-500 rounded-md px-2 pb-1 font-medium"
              >
                {tag}
              </Link>
            ))}
          </div>
        </article>
      ) : (
        <article className="lg:w-1/2 mb-8 mx-auto rounded-md p-5">
          <Link href={`/posts/${slug}`} className="flex flex-wrap items-center gap-3">
            <div className="">{date}</div>
            <h2 className="text-sm font-medium">{title}</h2>
          </Link>
        </article>
      )}
    </>
  );
};

export default SinglePost;
