import SinglePost from "@/components/Post/SinglePost";
import { getPostsForTopPage } from "@/lib/notionAPI";
import { GetStaticPaths } from "next";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{params: {page: "1"}}, {params: {page: "2"}}],
    fallback: "blocking",
  }
}

export const getStaticProps = async () => {
  const topPosts = await getPostsForTopPage();

  return {
    props: {
      topPosts: topPosts, //←同じ名前の時は topPosts, のみでいい
    },
    revalidate: 60 * 60 * 6,
  };
};

const BlogPageList =  ({ topPosts }) =>  {
  return (
    <div>
      <Head>
        <title>Notion Blog</title>
      </Head>
      <main className="container w-full mx-auto mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog 🚀
        </h1>
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
        {topPosts.map((post:any) => (
          <div key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={true}
            />
          </div>
        ))}
        </section>
      </main>
    </div>
  );
}

export default BlogPageList;