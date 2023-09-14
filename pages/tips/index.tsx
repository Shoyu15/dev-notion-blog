import SinglePost from "@/components/Post/SinglePost";
import { Tag } from "@/components/Tag/Tag";
import { getAllPosts, getAllTags, getPostsForTopPage } from "@/lib/notionAPI";
import Head from "next/head";
import Link from "next/link";

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

export default function Home({ allPosts, allTags }) {
  return (
    <div>
      <Head>
        <title>Notion Blog</title>
      </Head>
      <main className="container mx-auto mt-16 w-full">
        <Tag tags={allTags} />
        {allPosts.map((post: any) => (
          <div key={post.id} className="mt-8 first:mt-0">
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
