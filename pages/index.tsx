import { getAllPosts } from "@/lib/notionAPI";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts : allPosts //←同じ名前の時は allPosts, のみでいい
    },
    revalidate: 60 * 60 * 6,
  }
};

export default function Home({ allPosts }) {
  console.log(allPosts)
  return <h1>Hello</h1>;
}
