import Essay from "../../src/Essay";
import { getFirebaseSection } from "../../src/firebaseData";
import { buildMetadata } from "../../src/seo";

export const metadata = buildMetadata("essay");

export default async function EssayPage() {
  const essays = await getFirebaseSection("Essays");

  return <Essay initialEssays={essays} />;
}
