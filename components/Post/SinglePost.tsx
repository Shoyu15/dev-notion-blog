import Image from "next/image";
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
  const { title, description, date, tags, slug, isPaginationPage, thumbnail } =
    props;
  return (
    <>
      <article className="mx-auto">
        <Link href={`/tips/${slug}`} className="flex gap-6 py-4">
          <div className="basis-1/4">
            <Image
              src={thumbnail} // 画像のURLを指定
              alt={title} // 画像の代替テキスト
              width={300} // 画像の幅 
              height={200} // 画像の高さ
              className="object-cover aspect-video h-auto rounded-lg"
            />
          </div>
          <div className="flex-1">
            <ul className="[&>*:not(:first-child)]:ml-2">
              {tags.map((tag: string, index: number) => (
                <li
                  key={index}
                  className="bg-my-color-white inline-block text-my-color-dark rounded-xl px-3 py-1 font-normal text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mt-4">{title}</h2>
            <div className="text-sm mt-2">{date}</div>
          </div>
        </Link>
      </article>
    </>
  );
};

export default SinglePost;
