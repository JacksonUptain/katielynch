import About from "../../src/About";
import { buildMetadata } from "../../src/seo";

export const metadata = buildMetadata("about");

export default function AboutPage() {
  return <About />;
}
