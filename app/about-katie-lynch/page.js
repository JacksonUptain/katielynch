import { permanentRedirect } from "next/navigation";
import { buildMetadata } from "../../src/seo";

export const metadata = buildMetadata("about", {
  robots: { index: false, follow: true },
});

export default function AboutKatieLynchPage() {
  permanentRedirect("/about");
}
