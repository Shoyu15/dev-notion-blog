import SinglePost from "@/components/Post/SinglePost";
import { Tag } from "@/components/Tag/Tag";
import { getAllPosts, getAllTags, getPostsForTopPage } from "@/lib/notionAPI";
import Head from "next/head";
import Link from "next/link";

export const getStaticProps = async () => {
  const topPosts = await getPostsForTopPage();
  const allTags = await getAllTags();

  return {
    props: {
      topPosts: topPosts, //←同じ名前の時は topPosts, のみでいい
      allTags,
    },
    revalidate: 10,
  };
};

export default function Home({ topPosts, allTags }) {
  return (
    <div>
      <Head>
        <title>Notion Blog</title>
      </Head>
      <main className="container mx-auto mt-16 max-w-4xl">
        <div className="">
          <p className="text-2xl font-semibold mt-4">
            NotionとNext.jsで作ったブログです
          </p>
        </div>
        <Tag tags={allTags} />
        <div className="mt-16">
          {topPosts.map((post: any) => (
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
        </div>
        <div className="w-full text-center mt-16 mx-auto">
          <Link href="/tips">もっと見る</Link>
        </div>
      </main>
    </div>
  );
}
