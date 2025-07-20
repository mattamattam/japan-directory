import { sanity } from "@/lib/sanity";

export default async function Blog() {
  const posts = await sanity.fetch(`*[_type == "post"]{_id, title, excerpt}`);

  return (
    <div>
      <h1>Japan Travel Blog</h1>
      {posts.map((post: any) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
