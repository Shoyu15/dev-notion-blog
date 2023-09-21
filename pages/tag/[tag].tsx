import SinglePost from "@/components/Post/SinglePost";
import { Tag } from "@/components/Tag/Tag";
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTag,
} from "@/lib/notionAPI";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  posts:any
  currentTag:any
  allTags:any
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const allTags = await getAllTags();
    const params = allTags.map((tag: string) => ({
      params: { tag: tag },
    }));
    return {
      paths: params,
      fallback: false,
    };
  } catch (error) {
    console.error("Error generating paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentTag = context.params?.tag?.toString();

  const posts = await getPostsByTag(currentTag);

  const numberOfPagesByTag = await getNumberOfPagesByTag(currentTag);

  const allTags = await getAllTags();

  return {
    props: {
      posts,
      numberOfPagesByTag,
      currentTag,
      allTags,
    },
    revalidate: 10,
  };
};

const ArchiveTag = ({
  posts,
  currentTag,
  allTags,
}: Props) => {
  return (
    <div>
      <Head>
        <title>Notion Blog</title>
      </Head>
      <main className="container mx-auto mt-10 max-w-4xl">
        <div className="">
          <h1 className="text-5xl font-medium text-center">Tag</h1>
          <h3 className="text-md font-medium text-center mt-4">{currentTag}</h3>
        </div>
        <div className="mt-12">
          <Tag tags={allTags} />
        </div>
        <section className="mx-auto mt-8">
          {posts.map((post: any) => (
            <div key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
                thumbnail={post.thumbnail}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ArchiveTag;
