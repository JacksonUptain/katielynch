import Blog from "../../src/Blog";
import { getFirebaseSection } from "../../src/firebaseData";
import { buildMetadata } from "../../src/seo";

export const metadata = buildMetadata("blog");

export default async function BlogPage() {
  const blogs = await getFirebaseSection("Blog");

  return <Blog initialBlogs={blogs} />;
}
