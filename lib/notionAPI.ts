import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

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

const getPageMetaData = (post) => {  // 4. postに入ったデータのままだと使いづらいので、関数で使いやすいように取り出す

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