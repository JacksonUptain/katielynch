import Blog from "../../src/Blog";
import { getFirebaseSection } from "../../src/firebaseData";
import JsonLd from "../../src/JsonLd";
import { buildMetadata } from "../../src/seo";
import { webPageStructuredData } from "../../src/structuredData";

export const metadata = buildMetadata("blog", {
  robots: { index: false, follow: true },
});

export default async function BlogPage() {
  const blogs = await getFirebaseSection("Blog");

  return (
    <>
      <JsonLd data={webPageStructuredData("blog")} />
      <Blog initialBlogs={blogs} />
    </>
  );
}
