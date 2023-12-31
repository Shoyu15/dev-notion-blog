import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constans";
import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({
  notionClient: notion
})

// 全ての投稿を取得
export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending"
      }
    ]
  }) // 1.まずnotionDBに入ってデータを100個までもってくる

  const allPosts = posts.results; // 2. わかりやすいように、allPOstsという変数に入れる
  return allPosts.map((post) => { // 3. map関数で、1つずつデータを取り出して、postに入れる
    return getPageMetaData(post);
  });
};

// 4. postに入ったデータのままだと使いづらいので、関数で使いやすいように取り出す
const getPageMetaData = (post:any) => {
  const getTags = (tags:any) => { // 6. tagsの配列からtagを取り出す関数
    const allTags = tags.map((tag:any) => {
      return tag.name;
    })

    return allTags;
  }

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    // 5. tagsは配列になっていてややこしいので、6. でベット関数を用意して取り出して使う
    tags: getTags(post.properties.Tags.multi_select),
    thumbnail:
      post.properties.Thumb && post.properties.Thumb.files.length > 0
        ? post.properties.Thumb.files[0].file.url
        : null,
  }
}

// 詳細ページ用の投稿を取得
export const getSinglePost = async (slug:any) => { // getSinglePost3. (2)で取ってきたslugがここに入る 
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
    filter: { //getSinglePost6. (5)っていう条件のフィルター
      property: "Slug", //getSinglePost5. NotionDBのSlug(SlugはNotionDBで設定したもの)を見て、(4)と一致するものを返す
      formula: {
        string: {
          equals: slug, //getSinglePost4. getSinglePostの引数(3)で取ったslugがはいる
        }
      }
    }
  })

  const page = response.results[0];
  const metadata = getPageMetaData(page);

  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdBlocks)
  //console.log(mdString.parent);

  return {
    metadata,
    markdown: mdString.parent,
  }
};

// TOPページ用の記事取得（5つ）
export const getPostsForTopPage = async (pageSize = 5) => {
  const allPosts = await getAllPosts(); // 全て取得
  const topPosts = allPosts.slice(0, pageSize) //slice関数で、5つだけ取得
  return topPosts;
}

// TOPページ用の最新記事取得（1つ）
export const getLatestPostsForTopPage = async () => {
  const allPosts = await getAllPosts(); // 全て取得
  const topLatestPost = allPosts[0]; // 最新の1つの記事を取得
  return topLatestPost;
}

// ページ番号に応じた記事を取得
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts();

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE; // slice関数を動的に追歌目の計算ロジック page1なら0 / page2なら4
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE; // slice関数を動的に追歌目の計算ロジック page1なら4 / page2なら8

  return allPosts.slice(startIndex, endIndex)
}

export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

// slugにあるタグの記事を取得
export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE; // slice関数を動的に追歌目の計算ロジック page1なら0 / page2なら4
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex)
};

// tag一覧ページ ページネーションはなし
export const getPostsByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  return posts
};

export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getAllTags = async () => {
  const allPosts = await getAllPosts();
  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set)

  return allTagsList;
}