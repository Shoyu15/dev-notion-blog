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
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 100,
  }) // 1.まずnotionDBに入ってデータを100個までもってくる

  const allPosts = posts.results; // 2. わかりやすいように、allPOstsという変数に入れる
  return allPosts.map((post) => { // 3. map関数で、1つずつデータを取り出して、postに入れる
    return getPageMetaData(post);
  });
};

// 4. postに入ったデータのままだと使いづらいので、関数で使いやすいように取り出す
const getPageMetaData = (post) => {

  const getTags = (tags) => { // 6. tagsの配列からtagを取り出す関数
    const allTags = tags.map((tag) => {
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
  }
}

// 詳細ページ用の投稿を取得
export const getSinglePost = async (slug) => { // getSinglePost3. (2)で取ってきたslugがここに入る 
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
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

// TOPページ用の記事取得（4つ）
export const getPostsForTopPage = async (pageSize=4) => {
  const allPosts = await getAllPosts(); // 全て取得
  const topPosts = allPosts.slice(0,pageSize) //slice関数で、4つだけ取得
  return topPosts;
}