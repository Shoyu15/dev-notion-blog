import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

export const Tag = (props: Props) => {
  const { tags } = props;

  return (
    <div className="mx-4">
      <section className="mb-8 mx-auto">
        <div>タグ検索</div>
        <div className="flex gap-3 mt-3">
          {tags.map((tag: string, index:number) => (
            <Link href={`/posts/tag/${tag}/page/1`} key={index}>
              <span>{tag}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
