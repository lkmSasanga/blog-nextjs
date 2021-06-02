import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Link from "next/link";

export default function Home({ posts }) {
  console.log("i am on the client");

  return (
    <Layout>
      <div>
        {/* loop over the posts and show */}
        {posts &&
          posts.map((post) => (
            <Link href={`/${post.Slug}`} key={post.id}>
              <a>
                <h2 style={{paddingTop: '20px'}}>{post.Title}</h2>
                <p>@{post.User.username}</p>
              </a>
            </Link>
          ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // get posts from api
  const res = await fetch("https://blog-strapi-v1.herokuapp.com/posts");

  const posts = await res.json();

  console.log(posts);

  return {
    props: { posts },
  };
}
