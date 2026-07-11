import Contact from "../../src/Contact";
import { buildMetadata } from "../../src/seo";

export const metadata = buildMetadata("contact");

export default function ContactPage() {
  return <Contact />;
}
