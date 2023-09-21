import SinglePost from "@/components/Post/SinglePost";
import { Tag } from "@/components/Tag/Tag";
import { getAllPosts, getAllTags, getPostsForTopPage } from "@/lib/notionAPI";
import Head from "next/head";
import Link from "next/link";

type Props = {
  allPosts: any
  allTags: any
}

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  const allTags = await getAllTags();

  return {
    props: {
      allPosts: allPosts, //←同じ名前の時は allPosts, のみでいい
      allTags,
    },
    revalidate: 10,
  };
};

export default function Home({ allPosts, allTags }:Props) {
  return (
    <div>
      <Head>
        <title>Notion Blog</title>
      </Head>
      <main className="container mx-auto mt-10 max-w-4xl">
      <div className="">
          <h1 className="text-5xl font-medium text-center">All</h1>
        </div>
        <div className="mt-12">
          <Tag tags={allTags} />
        </div>
        <div className="mt-10">
          <div className="[&>*:not(:first-child)]:mt-8 mt-4">
            {allPosts.map((post: any) => (
              <div key={post.id} className="mt-8 first:mt-0">
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
