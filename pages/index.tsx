import SinglePost from "@/components/Post/SinglePost";
import { Tag } from "@/components/Tag/Tag";
import {
  getAllTags,
  getPostsForTopPage,
} from "@/lib/notionAPI";
import { GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  topPosts: any
  allTags: any
}

export const getStaticProps: GetStaticProps = async () => {
  const topPosts = await getPostsForTopPage();
  const allTags = await getAllTags();

  return {
    props: {
      topPosts, //←同じ名前の時は topPosts, のみでいい
      allTags,
    },
    revalidate: 10,
  };
};

export default function Home({ topPosts, allTags }:Props) {
  return (
    <div>
      <Head>
        <title>Notion Blog</title>
      </Head>
      <main className="container mx-auto mt-10 max-w-4xl">
        <div className="mt-10">
          <Tag tags={allTags} />
        </div>
        <div className="mt-10">
          <span className="text-gray-300">Latest</span>
          <div className="[&>*:not(:first-child)]:mt-8 mt-4">
            {topPosts.map((post: any) => (
              <div key={post.id} className="">
                <SinglePost
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  slug={post.slug}
                  isPaginationPage={false}
                  thumbnail={post.thumbnail}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
