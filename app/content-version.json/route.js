import { fetchFirebaseSeoContent } from "../../src/firebaseContent.mjs";

export const dynamic = "force-static";

export async function GET() {
  const { version } = await fetchFirebaseSeoContent();

  return Response.json({ version });
}
