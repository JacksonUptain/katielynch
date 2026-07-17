import Contact from "../../src/Contact";
import JsonLd from "../../src/JsonLd";
import { buildMetadata } from "../../src/seo";
import { webPageStructuredData } from "../../src/structuredData";

export const metadata = buildMetadata("contact");

export default function ContactKatieLynchPage() {
  return (
    <>
      <JsonLd data={webPageStructuredData("contact")} />
      <Contact />
    </>
  );
}
