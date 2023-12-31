import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  params: any;
  post: any;
};

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths: paths,
    fallback: "blocking", //falseなら404が表示される blockingは
  };
};

export const getStaticProps = async ({ params }: Props) => {
  // getSinglePost1. paramsという引数は現在のページのURLを見ることができる
  const post = await getSinglePost(params.slug); // getSinglePost2. URLの中のslugをgetSinglePOstに渡す

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

const Post = ({ post }: Props) => {
  return (
    <section className="container mx-auto mt-20">
      <div className="text-center">
        <h1 className="inline-block mx-auto max-w-3xl text-3xl font-semibold">
          <span>{post.metadata.title}</span>
        </h1>
        <div className="flex justify-center mt-6">
          <p className="text-gray-200">{post.metadata.date}</p>
        </div>
        <ul className="[&>*:not(:first-child)]:ml-2 mt-6">
          {post.metadata.tags.map((tag: string, index: number) => (
            <li
              key={index}
              className="bg-my-color-white inline-block text-my-color-dark rounded-xl px-3 py-1 font-normal text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-100 rounded-lg mt-10 mx-auto markdown p-10 text-my-color-dark max-w-4xl">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code>{children}</code>
              );
            },
          }}
        >
          {post.markdown}
        </ReactMarkdown>
      </div>
      <div className="w-full text-center mt-16 mx-auto">
        <Link href="/tips">一覧へ戻る</Link>
      </div>
    </section>
  );
};

export default Post;
