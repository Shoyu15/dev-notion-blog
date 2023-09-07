import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths: paths,
    fallback: "blocking", //falseなら404が表示される blockingは
  };
};

export const getStaticProps = async ({ params }) => {
  // getSinglePost1. paramsという引数は現在のページのURLを見ることができる
  const post = await getSinglePost(params.slug); // getSinglePost2. URLの中のslugをgetSinglePOstに渡す

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 6,
  };
};

const Post = ({ post }) => {
  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-me">{post.metadata.title}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">{post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string index: number) => (
        <p
          key={index}
          className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
        >
          {tag}
        </p>
      ))}
      <div className="mt-10 font-medium">
        <ReactMarkdown
          children={post.markdown}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        ></ReactMarkdown>
      </div>
    </section>
  );
};

export default Post;
