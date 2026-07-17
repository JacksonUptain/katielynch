import About from "../../src/About";
import JsonLd from "../../src/JsonLd";
import { buildMetadata } from "../../src/seo";
import { webPageStructuredData } from "../../src/structuredData";

export const metadata = buildMetadata("about");

export default function AboutKatieLynchPage() {
  return (
    <>
      <JsonLd data={webPageStructuredData("about")} />
      <About />
    </>
  );
}
