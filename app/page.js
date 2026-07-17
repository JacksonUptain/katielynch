import Home from "../src/Home";
import JsonLd from "../src/JsonLd";
import { buildMetadata } from "../src/seo";
import { webPageStructuredData } from "../src/structuredData";

export const metadata = buildMetadata("home");

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageStructuredData("home")} />
      <Home />
    </>
  );
}
