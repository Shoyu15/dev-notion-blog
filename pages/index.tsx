import SinglePost from "@/components/Post/SinglePost";
import { getAllPosts } from "@/lib/notionAPI";
import Head from "next/head";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts: allPosts, //←同じ名前の時は allPosts, のみでいい
    },
    revalidate: 60 * 60 * 6,
  };
};

export default function Home({ allPosts }) {
  return (
    <div>
      <Head>
        <title>Notion Blog</title>
      </Head>
      <main className="container w-full mx-auto mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog 🚀
        </h1>
        {allPosts.map((post) => (
          <div key={post.id} className="mx-4">
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
