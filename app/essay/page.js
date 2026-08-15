import Essay from "../../src/Essay";
import { getFirebaseSection } from "../../src/firebaseData";
import JsonLd from "../../src/JsonLd";
import { buildMetadata } from "../../src/seo";
import { webPageStructuredData } from "../../src/structuredData";

export const metadata = buildMetadata("essay", {
  robots: { index: false, follow: true },
});

export default async function EssayPage() {
  const essays = await getFirebaseSection("Essays");

  return (
    <>
      <JsonLd data={webPageStructuredData("essay")} />
      <Essay initialEssays={essays} />
    </>
  );
}
