import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[]; //stringの配列型らしい
  slug: string;
  isPaginationPage: boolean;
  thumbnail: string;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPaginationPage, thumbnail } = props;
  return (
    <>
      {isPaginationPage ? (
        <article className="mx-auto">
          <Link
            href={`/tips/${slug}`}
            className="flex flex-wrap items-center gap-3 w-fit"
          >
            <div className="text-sm">{date}</div>
            <h2 className="text-my-color text-sm font-medium">{title}</h2>
          </Link>
        </article>
      ) : (
        <article className="mx-auto">
          <Link
            href={`/tips/${slug}`}
            className="flex flex-wrap items-center gap-3 w-fit"
          >
            <div className="text-sm">{date}</div>
            <h2 className="text-my-color text-xl font-medium ml-4">{title}</h2>
          </Link>
        </article>
      )}
    </>
  );
};

export default SinglePost;
