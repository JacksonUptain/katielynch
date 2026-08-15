import { permanentRedirect } from "next/navigation";
import { buildMetadata } from "../../src/seo";

export const metadata = buildMetadata("home", {
  robots: { index: false, follow: true },
});

export default function KatieLynchAliasPage() {
  permanentRedirect("/");
}
