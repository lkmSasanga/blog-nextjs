import Layout from "../components/layout/Layout";

export default function Post({ post }) {
  return (
    <Layout>
      <div>
        <h2> {post.Title} </h2> 
        <p> {post.published_at} </p>{" "}
        <div> {post.Content} </div>{" "}
      </div>{" "}
    </Layout>
  );
}

// tell next.js how many pages there are
export async function getStaticPaths() {
  const res = await fetch("https://blog-strapi-v2.herokuapp.com/posts");

  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.Slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

// for each individual page: get the data for that page
export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await fetch(`https://blog-strapi-v2.herokuapp.com/posts?Slug=${slug}`);

  const data = await res.json();

  const post = data[0];

  return {
    props: { post },
  };
}

